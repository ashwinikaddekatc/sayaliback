package com.realnet.comm.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import com.google.common.net.HttpHeaders;
import com.realnet.comm.entity.NewStudentEntity;
import com.realnet.comm.response.NewStudentResponse;
import com.realnet.comm.service.NewStudentService;
import com.realnet.exceptions.ResourceNotFoundException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value="/api",produces=org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
@Api(tags = { "/NewStudentEntity" })

public class NewStudentController
{
  @Autowired
  private NewStudentService newStudentService;
  
    //get all data
	@ApiOperation(value = "List of new Students", response = NewStudentResponse.class)
    @GetMapping(path = "/getNewStudentList")
	public NewStudentResponse getdata(@RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
	@RequestParam(value = "size", defaultValue = "20", required = false) Integer size)
    {
	  NewStudentResponse resp = new NewStudentResponse();
	  Pageable paging = PageRequest.of(page, size);
	  Page<NewStudentEntity> result =  newStudentService.getList(paging);
	  //Page<CollegeStudentEntity> result =  collegeStudentService.getlist(paging);
	  resp.setPageStats(result, true);
	  resp.setNewStudentEntity(result.getContent());
	  return resp;
	}
	
	
	// add data
	@ApiOperation(value = "add a new  student", response = NewStudentEntity.class)
	@PostMapping(path = "/getNewStudentList")
	public ResponseEntity<?> savedata(
    @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authToken, @Valid
	@RequestBody NewStudentEntity NewStudentEntity) {
	
	NewStudentEntity data = newStudentService.createNewStudent(NewStudentEntity);
	if (data == null) {
	throw new ResourceNotFoundException("sales not saved");
	}
	return ResponseEntity.status(HttpStatus.CREATED).body(data);
	}
	
	// get data by id
		@ApiOperation(value = "Get a students", response = NewStudentEntity.class)
		@GetMapping("/getNewStudentList/{id}" )
		public ResponseEntity<NewStudentEntity> getbyid(@PathVariable("id") Integer id) {
			NewStudentEntity getid = newStudentService.getid(id);
			if (getid == null) {
				throw new ResourceNotFoundException("id not found with id " + id);
			}
			return ResponseEntity.ok().body(getid);
		}
		// UPDATE
		@ApiOperation(value = "update a new student", response = NewStudentEntity.class)
		@PutMapping("/getNewStudentList/{id}")
		public ResponseEntity<NewStudentEntity> updateTeacher(
				@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authToken,
				@PathVariable(value = "id") Integer id, @Valid @RequestBody NewStudentEntity newStudentEntity) {
			NewStudentEntity updatedsale = newStudentService.updateById(id, newStudentEntity);
			if (updatedsale == null || id != updatedsale.getStudentid()) {
				throw new ResourceNotFoundException("student not found with id " + id);
			}
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedsale);
		}
		
		
		// DELETE
		@DeleteMapping("/getNewStudentList/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteTeacher(@PathVariable(value = "id") Integer id) {
			boolean delete = newStudentService.deleteById(id);
			Map<String, Boolean> response = new HashMap<>();
			if (delete) {
				response.put("delete", Boolean.TRUE);
				return ResponseEntity.status(HttpStatus.OK).body(response);
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
} 

