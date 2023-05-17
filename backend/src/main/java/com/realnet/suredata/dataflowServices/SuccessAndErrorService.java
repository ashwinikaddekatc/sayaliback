package com.realnet.suredata.dataflowServices;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.realnet.suredata.entity.ErrorTable;
import com.realnet.suredata.entity.Success_table;
import com.realnet.users.entity1.AppUser;
import com.realnet.users.service1.AppUserServiceImpl;
import com.realnet.utils.Port_Constant;

@Service
public class SuccessAndErrorService {

	@Autowired
	private AppUserServiceImpl userService;

	public ResponseEntity<?> success(int count, String size) {

		AppUser loggedInUser = userService.getLoggedInUser();
		Long userId = loggedInUser.getUserId();
		Success_table success_table = new Success_table();

		success_table.setRecord_count(count);
		success_table.setRecord_size(size);
		success_table.setCreatedBy(userId);

		return new ResponseEntity<>(success_table, HttpStatus.ACCEPTED);

	}

	public ResponseEntity<?> error(String count, String response, String jobname, String jobgroup) {

		AppUser loggedInUser = userService.getLoggedInUser();
		Long userId = loggedInUser.getUserId();
		ErrorTable eTable = new ErrorTable();

		eTable.setEmailsent(true);
		eTable.setResponse(response);
		eTable.setStopdataflow(true);
		eTable.setCreatedBy(userId);

		RestTemplate restTemplate = new RestTemplate();
		String resourceUrl = "http://" + Port_Constant.LOCAL_HOST + ":" + Port_Constant.SURE_JOB_8089
				+ "/surejob/pauseschedule";

		HashMap<String, String> m = new HashMap<>();
		m.put("jobName", jobname);
		m.put("jobGroup", jobgroup);

		String token1 = "Bearer " + "1ff";
		HttpHeaders headers = getHeaders();
		headers.set("Authorization", token1);
		HttpEntity<Object> request = new HttpEntity<Object>(m.toString(), headers);
		ResponseEntity<Object> res = restTemplate.postForEntity(resourceUrl, request, Object.class);

		return new ResponseEntity<>(eTable, HttpStatus.ACCEPTED);

	}

	private HttpHeaders getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
		headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
		return headers;
	}
}
