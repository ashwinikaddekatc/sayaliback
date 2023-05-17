package com.realnet.flf.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.realnet.codeextractor.entity.Rn_Bcf_Extractor;
import com.realnet.codeextractor.repository.Rn_Bcf_Extractor_Repository;
import com.realnet.flf.entity.Rn_Bcf_Technology_Stack;
import com.realnet.flf.entity.Technology_element;
import com.realnet.flf.repository.Rn_Bcf_TechnologyStack_Repository;
import com.realnet.flf.repository.Techstack_elementRepo;
import com.realnet.utils.Constant;
import com.realnet.utils.Port_Constant;

@RestController
@RequestMapping("/token/flf/tech_stack")
public class Tech_stack_controller {

	@Autowired
	private Rn_Bcf_TechnologyStack_Repository technologyStack_Repository;

	@Autowired
	private Rn_Bcf_Extractor_Repository bcf_Extractor_Repository;

	@Autowired
	private Techstack_elementRepo elementRepo;

	@GetMapping("/get_techstack/{tech_stack}")
	public ResponseEntity<?> get_byname(@PathVariable String tech_stack) throws JsonProcessingException {

		Rn_Bcf_Technology_Stack stack = technologyStack_Repository.findByTech_stack(tech_stack);

		return new ResponseEntity<>(stack, HttpStatus.OK);
	}

	@GetMapping("/get_element/{technology_stack_id}")
	public ResponseEntity<?> get_element(@PathVariable Integer technology_stack_id) throws JsonProcessingException {

		List<Technology_element> stack = elementRepo.findtechid(technology_stack_id);

		return new ResponseEntity<>(stack, HttpStatus.OK);
	}

	@GetMapping("/get_rnbcf/{tech_stack}")
	public ResponseEntity<?> getbcf_extractor(@PathVariable String tech_stack) throws JsonProcessingException {

		List<Rn_Bcf_Extractor> stack = bcf_Extractor_Repository.findByTech_stack_name(tech_stack);

		return new ResponseEntity<>(stack, HttpStatus.OK);
	}

}
