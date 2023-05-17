package com.realnet.suredata.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realnet.suredata.entity.SureDataFlow_lines;
import com.realnet.suredata.repository.DataflowineRepository;

@RestController
@RequestMapping("/dataflow/dataflow_line")
public class DataflowLineController {

	@Autowired
	private DataflowineRepository line_repo;

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateById(@PathVariable Long id, @RequestBody SureDataFlow_lines outgoing_data) {

		SureDataFlow_lines line = line_repo.findById(id).get();
		line.setHeader_id(outgoing_data.getHeader_id());
		line.setModel(outgoing_data.getModel());
		SureDataFlow_lines save = line_repo.save(line);

		return new ResponseEntity<>(save, HttpStatus.ACCEPTED);

	}

	@GetMapping("/get/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {

		return new ResponseEntity<>(line_repo.findById(id).get(), HttpStatus.ACCEPTED);

	}

	@GetMapping("/getall")
	public ResponseEntity<?> getall() {

		return new ResponseEntity<>(line_repo.findAll(), HttpStatus.ACCEPTED);

	}
	
	

}
