package com.realnet.HealthCheckup.Controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.realnet.HealthCheckup.Entity.HealthCheckup_t;
import com.realnet.HealthCheckup.Repository.HealthCheckup_Repository;
import com.realnet.HealthCheckup.Services.HealthCheckup_Service;

@RequestMapping(value = "/HealthCheckup")
@RestController
public class HealthCheckup_Controller {

	@Autowired
	private HealthCheckup_Service Service;

	@Autowired
	private HealthCheckup_Repository checkup_Repository;

	@PostMapping("/HealthCheckup")
	public HealthCheckup_t Savedata(@RequestBody HealthCheckup_t data) {
		HealthCheckup_t save = Service.Savedata(data);
		return save;
	}

	@GetMapping("/HealthCheckup")
	public List<HealthCheckup_t> getdetails() {
		List<HealthCheckup_t> get = Service.getdetails();
		return get;
	}

	@GetMapping("/HealthCheckup/{id}")
	public HealthCheckup_t getdetailsbyId(@PathVariable Long id) {
		HealthCheckup_t get = Service.getdetailsbyId(id);
		return get;

	}

	@DeleteMapping("/HealthCheckup/{id}")
	public void delete_by_id(@PathVariable Long id) {
		Service.delete_by_id(id);

	}

	@PutMapping("/HealthCheckup/{id}")
	public HealthCheckup_t update(@RequestBody HealthCheckup_t data, @PathVariable Long id) {
		HealthCheckup_t update = Service.update(data, id);
		return update;
	}

	@GetMapping("/healthcheck/{id}")
	public ResponseEntity<String> healthCheck(@PathVariable Long id) {
		Optional<HealthCheckup_t> healthCheckupOpt = checkup_Repository.findById(id);
		if (healthCheckupOpt.isPresent()) {
			HealthCheckup_t healthCheckup = healthCheckupOpt.get();
			boolean isRunning = Service.isAppRunning(healthCheckup);

			if (isRunning) {
				return ResponseEntity.ok("Application is running");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Application is not running");
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/healthcheck")
	public ResponseEntity<Map<String, List<String>>> healthCheck() {
		List<HealthCheckup_t> healthCheckupList = Service.getdetails();
		Map<String, List<String>> resultMap = new HashMap<>();
		List<String> runningList = new ArrayList<>();
		List<String> notRunningList = new ArrayList<>();

		for (HealthCheckup_t healthCheckup : healthCheckupList) {
			boolean isRunning = Service.isAppRunningOrNot(healthCheckup.getIp(), healthCheckup.getPort());
			if (isRunning) {
				runningList.add(healthCheckup.getServiceName());
			} else {
				notRunningList.add(healthCheckup.getServiceName());
			}
		}

		resultMap.put("runningServices", runningList);
		resultMap.put("notRunningServices", notRunningList);
		return ResponseEntity.ok(resultMap);
	}

	@GetMapping("/healthcheckup")
	public ResponseEntity<Map<String, List<String>>> healthCheckup(@RequestParam String jobtype) {

		List<HealthCheckup_t> healthCheckupList = null;
		if (jobtype.contains("create_project")) {
			healthCheckupList = checkup_Repository.findbycreateproj();
		} 
		
		else if (jobtype.contains("create_deployment")) {
			healthCheckupList = checkup_Repository.findbycreatedeployment();
		} 
		
		else if (jobtype.contains("build_project")) {

			healthCheckupList = checkup_Repository.findbybuildapp();
		} 
		else if (jobtype.contains("deploy_app")) {
			healthCheckupList = checkup_Repository.findbydeployapp();

		}
		Map<String, List<String>> resultMap = new HashMap<>();
		List<String> runningList = new ArrayList<>();
		List<String> notRunningList = new ArrayList<>();

		for (HealthCheckup_t healthCheckup : healthCheckupList) {
			boolean isRunning = Service.isAppRunningOrNot(healthCheckup.getIp(), healthCheckup.getPort());
			if (isRunning) {
				runningList.add(healthCheckup.getServiceName());
			} else {
				notRunningList.add(healthCheckup.getServiceName());
			}
		}

		resultMap.put("runningServices", runningList);
		resultMap.put("notRunningServices", notRunningList);
		return ResponseEntity.ok(resultMap);
	}

}