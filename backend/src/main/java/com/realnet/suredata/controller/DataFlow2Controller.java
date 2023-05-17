package com.realnet.suredata.controller;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realnet.suredata.Services.DatabaseConnectionServices;
import com.realnet.suredata.dataflowServices.DataflowServiceImpl;
import com.realnet.suredata.entity.DataflowModel;
import com.realnet.suredata.entity.ResponseMessage;
import com.realnet.suredata.entity.SureDataEntity;
import com.realnet.suredata.entity.SureDatasourceEntity;
import com.realnet.suredata.repository.SureDataRepository;
import com.realnet.suredata.repository.SuredatasourceRepository;

@RestController
@RequestMapping("/suredata/suredataflow2")
public class DataFlow2Controller {

	@Autowired
	private SuredatasourceRepository surerepo;

	@Autowired
	private SureDataRepository datarepo;

	@Autowired
	DataflowServiceImpl dataflowServiceImpl;

	@Autowired
	DatabaseConnectionServices connectionServices;

	@GetMapping("/columnlist/{id}/{tableName}/{jobtype}")
	public ResponseEntity<?> getColumnListFromSourceTable(@PathVariable Long id, @PathVariable String tableName,
			@PathVariable String jobtype) {

		List<String> columnList = new ArrayList<>();

		try {
			List<String> tableList = null;
			if (jobtype.equalsIgnoreCase("source")) {
				tableList = (List<String>) getallTableListFromSource(id);
				SureDatasourceEntity sureDataEntity = surerepo.findById(id).get();
				String database = sureDataEntity.getDatabase_name();
				String query = "SELECT column_name FROM information_schema.columns WHERE table_schema = '" + database
						+ "' AND table_name = '" + tableName + "'";
				String username = sureDataEntity.getUser_name();
				String password = sureDataEntity.getPassword();
				String db_url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/"
						+ database;
				String data_source_type = sureDataEntity.getData_source_type();
				// Get connection to database
				Connection con = connectionServices.Connection(data_source_type, username, password, db_url);
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery(query);
				while (rs.next()) {
					String columnName = rs.getString("column_name");
					columnList.add(columnName);
				}
				con.close();
				if (columnList.size() == 0) {
					return new ResponseEntity<>(new ResponseMessage("No data found"), HttpStatus.NO_CONTENT);
				}

			} else if (jobtype.equalsIgnoreCase("store")) {
				tableList = (List<String>) getallTableListFromStore(id);

				SureDataEntity sureDataEntity = datarepo.findById(id).get();
				String database = sureDataEntity.getDatabase_name();
				String query = "SELECT column_name FROM information_schema.columns WHERE table_schema = '" + database
						+ "' AND table_name = '" + tableName + "'";
				String username = sureDataEntity.getUser_name();
				String password = sureDataEntity.getPassword();
				String db_url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/"
						+ database;
				String data_store_type = sureDataEntity.getData_store_type();
				// Get connection to database
				Connection con = connectionServices.Connection(data_store_type, username, password, db_url);
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery(query);
				while (rs.next()) {
					String columnName = rs.getString("column_name");
					columnList.add(columnName);
				}
				con.close();
				if (columnList.size() == 0) {
					return new ResponseEntity<>(new ResponseMessage("No data found"), HttpStatus.NO_CONTENT);
				}
			}

		} catch (SQLException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(columnList, HttpStatus.OK);
	}

	// Helper method to retrieve the list of tables from the data source
	private List<String> getallTableListFromSource(Long source_id) throws SQLException {
		List<String> tableList = new ArrayList<>();
		try {

			SureDatasourceEntity sureDataEntity = surerepo.findById(source_id).get();
			String database = sureDataEntity.getDatabase_name();
			String query = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + database + "'";
			String username = sureDataEntity.getUser_name();
			String password = sureDataEntity.getPassword();
			String db_url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/" + database;
			String data_source_type = sureDataEntity.getData_source_type();
			// Get connection to database
			Connection con = connectionServices.Connection(data_source_type, username, password, db_url);
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				String tableName = rs.getString("table_name");
				tableList.add(tableName);
			}
			con.close();
			return tableList;
		} catch (SQLException e) {
			throw e;
		}
	}

	private List<String> getallTableListFromStore(Long store_id) throws SQLException {
		List<String> tableList = new ArrayList<>();
		try {

			SureDataEntity sureDataEntity = datarepo.findById(store_id).get();
			String database = sureDataEntity.getDatabase_name();
			String query = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + database + "'";
			String username = sureDataEntity.getUser_name();
			String password = sureDataEntity.getPassword();
			String db_url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/" + database;
			String data_source_type = sureDataEntity.getData_store_type();
			// Get connection to database
			Connection con = connectionServices.Connection(data_source_type, username, password, db_url);
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				String tableName = rs.getString("table_name");
				tableList.add(tableName);
			}
			con.close();
			return tableList;
		} catch (SQLException e) {
			throw e;
		}
	}

}
