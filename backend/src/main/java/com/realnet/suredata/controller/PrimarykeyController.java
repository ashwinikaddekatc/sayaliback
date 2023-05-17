package com.realnet.suredata.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.realnet.suredata.entity.SureDatasourceEntity;
import com.realnet.suredata.repository.SuredatasourceRepository;

@RestController
@RequestMapping("/suredata/primarykey")
public class PrimarykeyController {

	@Autowired
	DataflowServiceImpl dataflowServiceImpl;

	@Autowired
	private SuredatasourceRepository surerepo;

	@Autowired
	DatabaseConnectionServices connectionServices;

	@GetMapping("/tablelistfromsource/{id}")
	public ResponseEntity<?> primarycolmnFromSource(@PathVariable Long id) throws SQLException {

		int i = 1;

		try {
			DataflowModel model = dataflowServiceImpl.getDataflowById(id);
			String data_source_name = model.getSelect_data_source();
			SureDatasourceEntity findByName = surerepo.findByName(data_source_name);
			List<Map<String, String>> list = new ArrayList<>();
			Long source_id = findByName.getId();
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
				String primaryKeyColumn = getPrimaryKeyColumn(tableName, con, database);
				Map<String, String> map = new HashMap<String, String>();
				map.put("id", String.valueOf(i));
				map.put("title", tableName);
				map.put("type", "source table");
				map.put("primary_key_column", primaryKeyColumn); // Add the primary key column to the map
				list.add(map);
				i++;
			}

			con.close();

			if (list.size() == 0) {
				list.add(null);
				return new ResponseEntity<>(new ResponseMessage("No data Found "), HttpStatus.ACCEPTED);
			}

			return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
		} catch (SQLException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.ACCEPTED);
		}
	}

	private String getPrimaryKeyColumn(String tableName, Connection con, String database) throws SQLException {
		String primaryKeyColumn = "";
		String query = "SELECT column_name " + "FROM information_schema.key_column_usage " + "WHERE table_schema = ? "
				+ "AND table_name = ? " + "AND constraint_name = 'PRIMARY'";

		PreparedStatement stmt = con.prepareStatement(query);
		stmt.setString(1, database);
		stmt.setString(2, tableName);
		ResultSet rs = stmt.executeQuery();

		if (rs.next()) {
			primaryKeyColumn = rs.getString("column_name");
		}

		rs.close();
		stmt.close();
		return primaryKeyColumn;
	}

	// ................................................
	// ...............................********.......................................

	// .................................................+++++++++++++++...........................

	@GetMapping("/primaryuniquetablelistfromsource/{id}")
	public ResponseEntity<?> getallTableListFromSource(@PathVariable Long id) throws SQLException {

		int i = 1;

		try {
			DataflowModel model = dataflowServiceImpl.getDataflowById(id);
			String data_source_name = model.getSelect_data_source();
			SureDatasourceEntity findByName = surerepo.findByName(data_source_name);
			List<Map<String, String>> list = new ArrayList<>();
			Long source_id = findByName.getId();
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
				String primaryKeyColumn = getPrimaryKeyColumn3(tableName, con, database);
				String uniqueKeyColumn = getPrimaryKeyOrUniqueKeyColumn(tableName, con, database);
				if (primaryKeyColumn == null) {
					// primaryKeyColumn = getFirstUniqueKeyColumn(tableName, con, database);
					uniqueKeyColumn = getPrimaryKeyOrUniqueKeyColumn(tableName, con, database);
					Map<String, String> map = new HashMap<String, String>();
					map.put("id", String.valueOf(i));
					map.put("title", tableName);
					map.put("type", "source table");
					map.put("uniqueKeyColumn", uniqueKeyColumn); // Add the primary key column to the map
					list.add(map);
				}
				Map<String, String> map = new HashMap<String, String>();
				map.put("id", String.valueOf(i));
				map.put("title", tableName);
				map.put("type", "source table");
				map.put("primary_key_column", primaryKeyColumn); // Add the primary key column to the map
				list.add(map);
				i++;
			}

			con.close();

			if (list.size() == 0) {
				list.add(null);
				return new ResponseEntity<>(new ResponseMessage("No data Found "), HttpStatus.ACCEPTED);
			}

			return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
		} catch (SQLException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.ACCEPTED);
		}
	}

	private String getPrimaryKeyColumn3(String tableName, Connection con, String database) throws SQLException {
		String primaryKeyColumn = null;
		String query = "SELECT column_name " + "FROM information_schema.key_column_usage " + "WHERE table_schema = ? "
				+ "AND table_name = ? " + "AND constraint_name = 'PRIMARY'";

		PreparedStatement stmt = con.prepareStatement(query);
		stmt.setString(1, database);
		stmt.setString(2, tableName);
		ResultSet rs = stmt.executeQuery();

		if (rs.next()) {
			primaryKeyColumn = rs.getString("column_name");
		}

		rs.close();
		stmt.close();
		return primaryKeyColumn;
	}

	private String getPrimaryKeyOrUniqueKeyColumn(String tableName, Connection con, String database)
			throws SQLException {
		String keyColumn = null;
		String query = "SELECT column_name " + "FROM information_schema.statistics " + "WHERE table_schema = ? "
				+ "AND table_name = ? " + "AND non_unique = 0 " + "LIMIT 1";

		PreparedStatement stmt = con.prepareStatement(query);
		stmt.setString(1, database);
		stmt.setString(2, tableName);
		ResultSet rs = stmt.executeQuery();

		if (rs.next()) {
			keyColumn = rs.getString("column_name");
		}

		rs.close();
		stmt.close();
		return keyColumn;
	}

}
