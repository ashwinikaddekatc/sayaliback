package com.realnet.suredata.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.realnet.suredata.entity.SureDataEntity;
import com.realnet.suredata.entity.SureDatasourceEntity;
import com.realnet.suredata.entity.SureDatasourceEntity;
import com.realnet.suredata.helper.Fileuploadhelper;
import com.realnet.suredata.repository.SureDataRepository;
import com.realnet.suredata.repository.SuredatasourceRepository;

@RestController
@RequestMapping("/api")
public class SuredatasourceController {
	@Autowired
	private SuredatasourceRepository suredatarepo;

	@Autowired
	private Fileuploadhelper fileuploadhelper;

	public final String UPLOAD_DIREC = "/src/main/resources/sshkeys";

//	save suredata detail

	@PostMapping("/suredatasource")
	public ResponseEntity<?> sureDataSave(@RequestParam MultipartFile ssh_file_key,
			@RequestParam String data) {

		try {

			if (ssh_file_key.isEmpty()) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("must contain file");
			}
			String f = fileuploadhelper.uploadFile(ssh_file_key);
			if (f != "") {
				SureDatasourceEntity suredata;
				suredata = new ObjectMapper().readValue(data, SureDatasourceEntity.class);
				suredata.setSsh_file_key(f);

				SureDatasourceEntity save = suredatarepo.save(suredata);
				return new ResponseEntity<>(save, HttpStatus.ACCEPTED);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("File not uploaded , Please Try Again", HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>("Something Went Wrong, Please Try Again", HttpStatus.BAD_REQUEST);

	}

////	update incoming details
	@PostMapping("/suredatasource/{id}")
	public ResponseEntity<?> sureDataUpdate(@PathVariable Long id,  @RequestParam MultipartFile ssh_file_key,
			@RequestParam String data) throws IOException {

//		if (ssh_file_key.isEmpty()) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("must contain file");
//		}
		SureDatasourceEntity s1;
		s1 = new ObjectMapper().readValue(data, SureDatasourceEntity.class);
		SureDatasourceEntity suredata = suredatarepo.findById(id).get();

		String f = fileuploadhelper.replaceFile(ssh_file_key, suredata.getSsh_file_key());
		suredata.setData_source_name(s1.getData_source_name());
		suredata.setData_source_type(s1.getData_source_type());
		suredata.setDatabase_name(s1.getDatabase_name());
		suredata.setDb_host_name(s1.getDb_host_name());
		suredata.setDescription(s1.getDescription());
		suredata.setActive(s1.getActive());
		suredata.setPortnumber(s1.getPortnumber());
		suredata.setConnectssh(s1.getConnectssh());
		suredata.setSsh_host_name(s1.getSsh_host_name());
		suredata.setSsh_file_key(f);
		suredata.setSsh_user_name(s1.getSsh_user_name());
		suredata.setSsh_password(s1.getSsh_password());
		suredata.setPassword(s1.getPassword());
		suredata.setUser_name(s1.getUser_name());
		SureDatasourceEntity save = suredatarepo.save(suredata);
		return new ResponseEntity<>(save, HttpStatus.ACCEPTED);

//		return new ResponseEntity<>("Something Went Wrong, Please Try Again", HttpStatus.BAD_REQUEST);

	}

//	Get By id suredata details
	@GetMapping("/suredatasource/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		System.out.println(id);
		SureDatasourceEntity findById = suredatarepo.findById(id).get();
		return new ResponseEntity<>(findById, HttpStatus.ACCEPTED);
	}

//	Get All suredata details
	@GetMapping("/suredatasource")
	public ResponseEntity<?> getAllOutgoing() {

		return new ResponseEntity<>(suredatarepo.findAll(), HttpStatus.ACCEPTED);
	}

//	delete suredata details
	@DeleteMapping("/suredatasource/{id}")
	public String outgoingDelete(@PathVariable Long id) {
		suredatarepo.deleteById(id);
		return "Deleted";
	}
}
