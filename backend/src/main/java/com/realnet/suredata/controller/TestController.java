package com.realnet.suredata.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.realnet.suredata.Services.DatabaseConnectionServices;
import com.realnet.suredata.entity.ResponseMessage;

@RestController
@RequestMapping("/suredata/test")
public class TestController {

	@Autowired
	DatabaseConnectionServices connectionServices;

	@GetMapping("/testconnection")
	public ResponseEntity<?> getcolomnListFromSource(@RequestParam String database_type,
			@RequestParam String store_username, @RequestParam String store_password,
			@RequestParam String portnumber, @RequestParam String dbhostname) throws SQLException {

		String url = dbhostname + ":" + portnumber + "/";

		Connection con = connectionServices.Connection(database_type, store_username, store_password, url);

		if (con.getMetaData() != null) {
			return new ResponseEntity<>(new ResponseMessage("connection made"), HttpStatus.OK);

		} else {

			return new ResponseEntity<>(new ResponseMessage("connection not made"), HttpStatus.BAD_REQUEST);
		}

	}
}
