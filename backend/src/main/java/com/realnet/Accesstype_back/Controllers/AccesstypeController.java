package com.realnet.Accesstype_back.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.realnet.Accesstype_back.Entity.Accesstype;
import com.realnet.Accesstype_back.Services.AccesstypeService;
import com.realnet.webhook.Service.Workflow_service;

@RequestMapping(value = "/access_type")
@RestController
public class AccesstypeController {

	@Autowired
	private AccesstypeService Service;

	@Autowired
	private Workflow_service workflow_service;
	//add data
	@PostMapping("/Accesstype")
	public Accesstype Savedata(@RequestBody Accesstype data) throws JsonProcessingException {
		Accesstype save = Service.Savedata(data);
		
		workflow_service.save_webhook(data, "post", "Accesstype");
		return save;
	}
	//get all
	@GetMapping("/Accesstype")
	public List<Accesstype> getdetails() {
		List<Accesstype> get = Service.getdetails();
		return get;
	}

	//getby id
	@GetMapping("/Accesstype/{id}")
	public Accesstype getdetailsbyId(@PathVariable Long id) {
		Accesstype get = Service.getdetailsbyId(id);
		return get;
	}


	//update by id
	@PutMapping("/Accesstype/{id}")
	public Accesstype update(@RequestBody Accesstype data, @PathVariable Long id) {
		Accesstype update = Service.update(data, id);
		return update;
	}
	
	//delete by id
	@DeleteMapping("/Accesstype/{id}")
	public ResponseEntity<?> delete_by_id(@PathVariable Long id) {
		Service.delete_by_id(id);
		return new ResponseEntity<>("deleted",HttpStatus.OK);

	}
}