package com.realnet.comm.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.realnet.comm.entity.PlayEntity2;
import com.realnet.comm.entity.WorkflowEntity2;
import com.realnet.exceptions.ResourceNotFoundException;
import com.realnet.fnd.response.PlayResponse2;
import com.realnet.fnd.service.PlayService2;
import com.realnet.fnd.service.WorkflowService2;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value="/api",produces=org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
@Api(tags = { "/StudentEntity" })
public class PlayController2
{
	@Autowired
	private PlayService2 collegeStudentService;
	
	@Autowired
	private WorkflowService2 workflowservice;
	
	        // get all data
			@ApiOperation(value = "List of College Students", response = PlayResponse2.class)
			@GetMapping(path = "/studentnew")
			public PlayResponse2 getdata(@RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
					@RequestParam(value = "size", defaultValue = "20", required = false) Integer size) {
				PlayResponse2 resp = new PlayResponse2();
				Pageable paging = PageRequest.of(page, size);
				Page<PlayEntity2> result =  collegeStudentService.getlist(paging);
				resp.setPageStats(result, true);
				resp.setStudentEntity(result.getContent());
				return resp;
			}
			
			// get data by id
			@ApiOperation(value = "Get a students", response = PlayEntity2.class)
			@GetMapping("/studentnew/{id}" )
			public ResponseEntity<PlayEntity2> getbyid(@PathVariable("id") Integer id) {
				PlayEntity2 getid = collegeStudentService.getid(id);
				if (getid == null) {
					throw new ResourceNotFoundException("id not found with id " + id);
				}
				return ResponseEntity.ok().body(getid);
			}
			
			
		       // get data by wf_id
				@ApiOperation(value = "Get a students", response = PlayEntity2.class)
				@GetMapping("/newstudentwf_id/{id}" )
				public ResponseEntity<PlayEntity2> getbywfid(@PathVariable("id") Integer id) {
					PlayEntity2 getid = collegeStudentService.getwf_instance_id(id);
					if (getid == null) {
						throw new ResourceNotFoundException("id not found with id " + id);
					}
					return ResponseEntity.ok().body(getid);
				}
				
				// UPDATE by wf_id
				@ApiOperation(value = "update a college portal", response = PlayEntity2.class)
				@PutMapping("/newstudentwf_id/{id}")
				public ResponseEntity<PlayEntity2> updatewfid(
						@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authToken,
						@PathVariable(value = "id") Integer id, @Valid @RequestBody PlayEntity2 collegeStudentEntity) {
					PlayEntity2 updatedsale = collegeStudentService.updateBywf_instance_id(id, collegeStudentEntity);
					if (updatedsale == null || id != updatedsale.getWf_instance_id()) {
						throw new ResourceNotFoundException("student not found with id " + id);
					}
					return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedsale);
				}
			
			// add data
			@ApiOperation(value = "add a student", response = PlayEntity2.class)
			@PostMapping(path = "/studentnew")
			public ResponseEntity<?> savedata(
					@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authToken, @Valid
					@RequestBody PlayEntity2 StudentEntity) {
				
				    WorkflowEntity2 wf=new WorkflowEntity2();
				
					wf.setCurrent_json("{\"step0\":{\"state\":\"current\",\"open\":true},\"step1\":{\"state\":\"not-started\",\"open\":false},\"step2\":{\"state\":\"not-started\",\"open\":false,\"failed\":false},\"step3\":{\"state\":\"not-started\",\"open\":false,\"failed\":false},\"step4\":{\"state\":\"not-started\",\"open\":false,\"failed\":false}}");
					wf.setStatus("not_started");
					wf.setWf_id(0);
					
					WorkflowEntity2 save = workflowservice.save(wf);
					
					System.out.println("workflow data  "+save);
					
					PlayEntity2 data=null;
					
					if(save.getId()!=0)
					{
						 StudentEntity.setWf_instance_id(save.getId());
						 data = collegeStudentService.createCollageStudent(StudentEntity);	
					}
					
					System.out.println("student data "+data);
				
					if (data == null) {
					throw new ResourceNotFoundException("sales not saved");
				}
				return ResponseEntity.status(HttpStatus.CREATED).body(data);
			}
			

			// UPDATE jason object
			@ApiOperation(value = "update", response = WorkflowEntity2.class)
			@PutMapping("/newcurrentObj/{id}")
			public ResponseEntity<WorkflowEntity2> updateJasonObject(@PathVariable(value = "id") Integer id,
					@RequestParam(value="current_json") String obj) {
				System.out.println("OBj::"+obj);
				WorkflowEntity2 currentJason=new WorkflowEntity2();
				currentJason.setCurrent_json(obj);
				WorkflowEntity2 updatedsale = workflowservice.updateById(id, currentJason);
				if (updatedsale == null || id != updatedsale.getId()) {
					throw new ResourceNotFoundException("student not found with id " + id);
				}
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedsale);
			}
			
			
			// UPDATE
			@ApiOperation(value = "update a college portal", response = PlayEntity2.class)
			@PutMapping("/studentnew/{id}")
			public ResponseEntity<PlayEntity2> updateTeacher(
					@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authToken,
					@PathVariable(value = "id") Integer id, @Valid @RequestBody PlayEntity2 collegeStudentEntity) {
				PlayEntity2 updatedsale = collegeStudentService.updateById(id, collegeStudentEntity);
				if (updatedsale == null || id != updatedsale.getStudentid()) {
					throw new ResourceNotFoundException("student not found with id " + id);
				}
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedsale);
			}
			
			// DELETE
			@DeleteMapping("/studentnew/{id}")
			public ResponseEntity<Map<String, Boolean>> deleteTeacher(@PathVariable(value = "id") Integer id) {
				boolean delete = collegeStudentService.deleteById(id);
				Map<String, Boolean> response = new HashMap<>();
				if (delete) {
					response.put("delete", Boolean.TRUE);
					return ResponseEntity.status(HttpStatus.OK).body(response);
				}
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
			
		
			
}
