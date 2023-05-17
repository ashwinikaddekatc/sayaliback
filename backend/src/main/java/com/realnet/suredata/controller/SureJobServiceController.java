package com.realnet.suredata.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.realnet.suredata.dataflowServices.SureDataJobService;
import com.realnet.suredata.entity.SureDataFlow_lines;
import com.realnet.suredata.entity.SureDataflowJobEntity;
import com.realnet.suredata.repository.DataflowineRepository;
import com.realnet.suredata.repository.SuredataflowJobRepository;
import com.realnet.utils.Port_Constant;
import com.realnet.webhook.Response.EntityResponse;

import javassist.expr.NewArray;

@RestController
@RequestMapping("/token/suredata/surejob")

public class SureJobServiceController {

	Logger log = LoggerFactory.getLogger(SureJobServiceController.class);

	@Autowired
	private SuredataflowJobRepository jobrepo;

	@Autowired
	private DataflowineRepository flowrepo;

	@Autowired
	private DataflowineRepository line_repo;

	@Autowired
	SureDataJobService service;

	@PostMapping("/assignJob")
	public ResponseEntity<?> jobAssign() {
		SureDataflowJobEntity obj = new SureDataflowJobEntity();
		SureDataflowJobEntity obj2 = new SureDataflowJobEntity();
		SureDataflowJobEntity obj3 = new SureDataflowJobEntity();

		obj.setConnection_name(null);
		obj.setJob_type("INCREMENTAL ONLY");
		obj.setMethod("GET");
		obj.setParameters(null);
		obj.setUrl("/suredata/suredataflow/incrementaluploadonly/");
		obj.setRef(null);
		jobrepo.save(obj);

		obj2.setConnection_name(null);
		obj2.setJob_type("INITIAL UPLOAD ONLY");
		obj2.setMethod("GET");
		obj2.setParameters(null);
		obj2.setRef(null);
		obj2.setUrl("/suredata/suredataflow/initialupload");
		jobrepo.save(obj2);

		obj3.setConnection_name(null);
		obj3.setMethod("GET");
		obj3.setParameters(null);
		obj3.setRef(null);
		obj3.setUrl("/suredata/suredataflow/incrementalupload");
		obj3.setJob_type("INCREMENTAL ONLY");
		jobrepo.save(obj3);

		return new ResponseEntity<>(obj3, HttpStatus.ACCEPTED);
	}

	@GetMapping("/getjob/{job_type}")
	public ResponseEntity<?> getByJob(@PathVariable String job_type) {

		SureDataflowJobEntity jobtype = jobrepo.getByJobType(job_type);
		return new ResponseEntity<>(jobtype, HttpStatus.ACCEPTED);
	}

//	for create job
	@GetMapping("/create_job/{id}")
	public ResponseEntity<?> createjob(@PathVariable Long id) throws SQLException {

		String job_url = "";
		String CRON_exp = "";
		String job_type = "";
		String title = "";
		String node = "";
		ArrayList<Object> list = new ArrayList<>();
		SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);
		String str = lines.getModel();

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(str);
		JsonArray array = element.getAsJsonArray();
//		Iterator iterator = array.iterator();

		for (JsonElement jsonElement : array) {

			JsonObject jsonObject = jsonElement.getAsJsonObject();
			node = jsonObject.get("id").getAsString();

//			if (i == node_id) {

			CRON_exp = jsonObject.get("cron").getAsString();

			title = jsonObject.get("title").getAsString();

			StringBuilder builder = new StringBuilder();

			builder.append("no data");
			System.out.println(builder.toString());

			Map<String, String> jobprodata = new HashMap<String, String>();
			jobprodata.put("jobName", title + "_" + System.currentTimeMillis());
			jobprodata.put("jobGroup", "dataflow");
			jobprodata.put("startTime", "2022-12-26T13:02");
			jobprodata.put("counter", "5");
			jobprodata.put("repeatTime", "5");
			jobprodata.put("cronExpression", CRON_exp);
			jobprodata.put("line_id", id.toString());
			jobprodata.put("node_id", node);

			System.out.println(jobprodata);

			RestTemplate restTemplate = new RestTemplate();
			String jobprourl2 = "http://" + Port_Constant.LOCAL_HOST + ":" + Port_Constant.SURE_JOB_8089
					+ "/surejob/schedule";
			HttpHeaders headers2 = getHeaders();
			HttpEntity<Object> request2 = new HttpEntity<Object>(jobprodata, headers2);

			ResponseEntity<Object> res2 = restTemplate.postForEntity(jobprourl2, request2, Object.class);
			System.out.println(res2.getStatusCodeValue());

			if (res2.getStatusCodeValue() == 200) {
				log.info("Gitea data inserted in sure job");
				System.out.println(res2.getBody());

			}
		}

		return new ResponseEntity<>(new EntityResponse("sure job created"), HttpStatus.ACCEPTED);

	}

	@GetMapping("/surejob/{id}/{node_id}")
	public ResponseEntity<?> forjobscheduler(@PathVariable Long id, @PathVariable Long node_id) throws SQLException {

		ArrayList<Object> list = new ArrayList<>();
		SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);
		String str = lines.getModel();

//		String str = "[{\"title\":\"table2\",\"type\":\"ENTITIES\",\"id\":\"1\",\"storetable\":\"newtable2\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"},"
//				+ "{\"title\":\"USER\",\"type\":\"ENTITIES\",\"id\":\"2\",\"storetable\":\"USER\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"},"
//				+ "{\"title\":\"POSITION\",\"type\":\"ENTITIES\",\"id\":\"3\",\"storetable\":\"POSITION\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"}]";

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(str);
		JsonArray array = element.getAsJsonArray();
		Iterator iterator = array.iterator();

		String job_url = "";
		String CRON_exp = "";
		String job_type = "";
		SureDataflowJobEntity job = null;

		Boolean auto_mapping = true;
		while (iterator.hasNext()) {

			Object next = iterator.next();
			JsonElement parse = parser.parse(next.toString());
			JsonObject jsonObject = parse.getAsJsonObject();
			int i = jsonObject.get("id").getAsInt();

			if (i == node_id) {

//				CRON_exp = jsonObject.get("CRON").getAsString();

				job_type = jsonObject.get("refreshtype").toString().replaceAll("\"", "");
				
				if (job_type.isEmpty() || job_type.contains("null") || job_type == null) {
					job_type = jsonObject.get("flowtype").toString().replaceAll("\"", "");
				}
				

				job = jobrepo.getByJobType(job_type);

				break;
			}

		}
		return new ResponseEntity<>(job, HttpStatus.ACCEPTED);
	}
//	GET DATA FLOW LINE

	@GetMapping("/getline/{id}")
	public ResponseEntity<?> getline(@PathVariable Long id) {

		return new ResponseEntity<>(line_repo.getSureDataflowlines(id), HttpStatus.ACCEPTED);

	}

	private HttpHeaders getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
		headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
		return headers;
	}
}
