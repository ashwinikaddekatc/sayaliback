package com.realnet.suredata.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.realnet.suredata.Services.DatabaseConnectionServices;
import com.realnet.suredata.dataflowServices.DataflowServiceImpl;
import com.realnet.suredata.dataflowServices.FilterService;
import com.realnet.suredata.dataflowServices.SuccessAndErrorService;
import com.realnet.suredata.entity.DataflowModel;
import com.realnet.suredata.entity.ResponseMessage;
import com.realnet.suredata.entity.SureDataEntity;
import com.realnet.suredata.entity.SureDataFlow_lines;
import com.realnet.suredata.entity.SureDatasourceEntity;
import com.realnet.suredata.repository.DataflowineRepository;
import com.realnet.suredata.repository.SureDataRepository;
import com.realnet.suredata.repository.SuredatasourceRepository;

@RestController
@RequestMapping("/token/suredata/suredataflow")
public class TokenFreeController {
	@Autowired
	private SuredatasourceRepository surerepo;

	@Autowired
	private SureDataRepository datarepo;

	@Autowired
	private FilterService filterService;

	@Autowired
	DataflowServiceImpl dataflowServiceImpl;

	@Autowired
	private DataflowineRepository flowrepo;

	@Autowired
	DatabaseConnectionServices connectionServices;

	@Autowired
	private SuccessAndErrorService sErrorService;

	@GetMapping("/createdb/{id}")
	public ResponseEntity<?> createDatabaseAtStore(@PathVariable Long id) {
		SureDataEntity sureDataEntity = datarepo.findById(id).get();
		String database_name = sureDataEntity.getDatabase_name();
		String store_username = sureDataEntity.getUser_name();
		String store_password = sureDataEntity.getPassword();
		String database_type = sureDataEntity.getData_store_type();
		String query = null;
		if (database_type.equals("ms_sql")) {
			// MsSQL syntax
			query = "CREATE DATABASE " + database_name + ";";
		} else {
			// My SQL syntax
			query = "CREATE SCHEMA " + database_name + ";";
		}
		String url = null;
		if (database_type.equals("ms_sql")) {
			// MsSQL syntax
			url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber();
		} else {
			// My SQL syntax
			url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/";
		}
		try {
//			GET CONNECTION TO DATABSE
			Connection connectToStore = connectionServices.Connection(database_type, store_username, store_password,
					url);
			// Connection connectToStore = DriverManager.getConnection(url, store_username,
			// store_password);
			Statement store_stmt = connectToStore.createStatement();
			store_stmt.executeUpdate(query);
			connectToStore.close();
			return new ResponseEntity<>(new ResponseMessage("DataBase created Successfully"), HttpStatus.ACCEPTED);
		} catch (SQLException sql) {
			return new ResponseEntity<>(new ResponseMessage("Something went Wrong... Retry...!!!!"),
					HttpStatus.BAD_REQUEST);
		}
	}

//	create data at data store
//	@GetMapping("/createdb/{id}")
//	public ResponseEntity<?> createDatabaseAtStore(@PathVariable Long id) {
//
//		SureDataEntity sureDataEntity = datarepo.findById(id).get();
//		String database_name = sureDataEntity.getDatabase_name();
//
////		create a database at data store server
//		String query = "CREATE SCHEMA " + database_name + ";";
//		String store_username = sureDataEntity.getUser_name();
//		String store_password = sureDataEntity.getPassword();
//		String database_type = sureDataEntity.getData_store_type();
//
//		String url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/";
//		try {
////			GET CONNECTION TO DATABSE
//			Connection connectToStore = connectionServices.Connection(database_type, store_username, store_password,
//					url);
//
//			// Connection connectToStore = DriverManager.getConnection(url, store_username,
//			// store_password);
//			Statement store_stmt = connectToStore.createStatement();
//			store_stmt.executeUpdate(query);
//			connectToStore.close();
//			return new ResponseEntity<>(new ResponseMessage("DataBase created Successfully"), HttpStatus.ACCEPTED);
//		} catch (SQLException sql) {
//			return new ResponseEntity<>(new ResponseMessage("Something went Wrong... Retry...!!!!"),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

//	get all table list with from data source 
	@GetMapping("/tablelistfromsource/{id}")
	public ResponseEntity<?> getTableListFromSource(@PathVariable Long id) throws SQLException {

		int i = 1;

		try {
			DataflowModel model = dataflowServiceImpl.getDataflowById(id);
			String data_source_name = model.getSelect_data_source();
			SureDatasourceEntity findByName = surerepo.findByName(data_source_name);
//		List<String> list = getAllTableListById(id);
			List<Map<String, String>> list = new ArrayList<>();
			Long source_id = findByName.getId();
			SureDatasourceEntity sureDataEntity = surerepo.findById(source_id).get();
			String database = sureDataEntity.getDatabase_name();
			String query = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + database + "'";
			String username = sureDataEntity.getUser_name();
			String password = sureDataEntity.getPassword();
			String db_url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/" + database;
			String data_source_type = sureDataEntity.getData_source_type();

//				GET CONNECTION TO DATABSE
			Connection con = connectionServices.Connection(data_source_type, username, password, db_url);
//			Connection con = DriverManager.getConnection(db_url, username, password);
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {
				String tableName = rs.getString("table_name");
				Map<String, String> map = new HashMap<String, String>();
				map.put("id", String.valueOf(i));
				map.put("title", tableName);
				map.put("type", "source table");
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

//	get all table list with from data store 
	@GetMapping("/tablelistfromstore/{id}")
	public ResponseEntity<?> getTableListFromStore(@PathVariable Long id) throws SQLException {

		int i = 1;
		Map<String, String> map = new HashMap<String, String>();

		DataflowModel model = dataflowServiceImpl.getDataflowById(id);
		String data_store_name = model.getSelect_data_store();
		SureDataEntity findByName = datarepo.findByName(data_store_name);
		List<Map<String, String>> list = new ArrayList<>();
		Long store_id = findByName.getId();

		SureDataEntity sureDataEntity = datarepo.findById(store_id).get();
		String database = sureDataEntity.getDatabase_name();
		String query = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + database + "'";

		String username = sureDataEntity.getUser_name();
		String password = sureDataEntity.getPassword();
		String data_store_type = sureDataEntity.getData_store_type();
		try {
			String db_url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/" + database;

//			GET CONNECTION TO DATABSE
			Connection con = connectionServices.Connection(data_store_type, username, password, db_url);
//			Connection con = DriverManager.getConnection(db_url, username, password);
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {

				String tableName = rs.getString("table_name");
				map.put("id", String.valueOf(i));
				map.put("title", tableName);
				map.put("type", "store table");
				list.add(map);
				i++;

			}
			con.close();
			if (list.size() == 0) {
				map.put("id", "0");
				map.put("title", "test");
				map.put("type", "store table");
				list.add(map);
				return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
			}
			return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
		} catch (SQLException sql) {
			return new ResponseEntity<>(sql.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

//	inital upload only
	@GetMapping("/initialupload/{id}/{node_id}")
	public ResponseEntity<?> insertDataAtStore(@PathVariable Long id, @PathVariable int node_id)
			throws SQLException, JsonProcessingException {

		SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);
		String str = lines.getModel();

//		String str = "[{\"title\":\"abc\",\"type\":\"ENTITIES\",\"id\":\"1\",\"storetable\":\"newtable3\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"},"
//				+ "{\"title\":\"USER\",\"type\":\"ENTITIES\",\"id\":\"2\",\"storetable\":\"USER\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"},"
//				+ "{\"title\":\"POSITION\",\"type\":\"ENTITIES\",\"id\":\"3\",\"storetable\":\"POSITION\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"}]";

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(str);
		JsonArray array = element.getAsJsonArray();
		Iterator iterator = array.iterator();

		String source_table = "";
		String store_table = "";
		Boolean auto_mapping = true;

		while (iterator.hasNext()) {

			Object next = iterator.next();
			JsonElement parse = parser.parse(next.toString());
			JsonObject jsonObject = parse.getAsJsonObject();
			int i = jsonObject.get("id").getAsInt();

			if (i == node_id) {
				source_table = jsonObject.get("title").getAsString();
				store_table = jsonObject.get("storetable").getAsString();
//				auto_mapping = jsonObject.get("create_new_table").getAsBoolean();
				break;
			}

		}

//		Getting credential form dataflow table 
		DataflowModel model = dataflowServiceImpl.getDataflowById(id);

//		if auto mapping is true that means table  has not been created that we will create a table 
		if (auto_mapping) {
			Boolean createTable = createTable(id, source_table, store_table, node_id);
			if (!createTable) {

//				sErrorService.error(source_table, store_table, false);
//				save null to that particular auto mapping 
				return new ResponseEntity<>(new ResponseMessage("Data Already migrated "), HttpStatus.ACCEPTED);
			}
		}
		return new ResponseEntity<>(new ResponseMessage("Data Inserted Successfully "), HttpStatus.ACCEPTED);

//			return new ResponseEntity<>(new ResponseMessage("Something Went Wrong"), HttpStatus.BAD_REQUEST);

	}

//	initial upload and incremental only 
	@GetMapping("/incrementalupload/{id}/{node_id}")
	public ResponseEntity<?> increamtnaUploadDataAtStore(@PathVariable Long id, @PathVariable Integer node_id)
			throws SQLException, JsonProcessingException {

		SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);
		String str = lines.getModel();

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(str);
		JsonArray array = element.getAsJsonArray();
		Iterator iterator = array.iterator();

		String source_table = "";
		String store_table = "";

		Boolean auto_mapping = true;

		while (iterator.hasNext()) {

			Object next = iterator.next();
			JsonElement parse = parser.parse(next.toString());
			JsonObject jsonObject = parse.getAsJsonObject();
			int i = jsonObject.get("id").getAsInt();

			if (i == node_id) {
				source_table = jsonObject.get("title").getAsString();
				store_table = jsonObject.get("storetable").getAsString();
//				auto_mapping = jsonObject.get("create_new_table").getAsBoolean();
				break;
			}

		}

//		Getting credential form dataflow table 
		DataflowModel model = dataflowServiceImpl.getDataflowById(id);
		String data_store_name = model.getSelect_data_store();
		String data_source_name = model.getSelect_data_source();

		if (auto_mapping) {
			Boolean createTable = createTable(id, source_table, store_table, node_id);

//			if(!createTable) {
////				save null to that particular auto mapping 
//				return new ResponseEntity<>(new ResponseMessage("Data Already migrated "), HttpStatus.ACCEPTED);
//			}

		}

//		data Source Configuration getting from dataflow table

		try {
//			Data Store Configuration getting from dataflow table

			SureDataEntity findByName = datarepo.findByName(data_store_name);
			Long store_id = findByName.getId();
			String database_name = findByName.getDatabase_name();
			String store_username = findByName.getUser_name();
			String store_password = findByName.getPassword();
			String url = findByName.getDb_host_name() + ":" + findByName.getPortnumber() + "/" + database_name;
			String data_store_type = findByName.getData_store_type();

//			GET CONNECTION TO DATABSE
			Connection store_connnection = connectionServices.Connection(data_store_type, store_username,
					store_password, url);
//			Connection store_connnection = DriverManager.getConnection(url, store_username, store_password);

//					Auto increment in data store 
			int count_id = 0;
			int max_store_id = 0;
			int max_source_id = 0;

			String max_query = "SELECT MAX(ref_id) As ref_id FROM " + store_table;

			String id_max_query = "SELECT MAX(id) As max_id FROM " + store_table;

			PreparedStatement stmt_tab = store_connnection.prepareStatement(max_query);
			ResultSet count_table = stmt_tab.executeQuery();

			PreparedStatement stmt_tab2 = store_connnection.prepareStatement(id_max_query);
			ResultSet store_table_rs = stmt_tab2.executeQuery();

			if (store_table_rs.next()) {
				max_store_id = store_table_rs.getInt("max_id");
			}
			if (count_table.next()) {
				count_id = count_table.getInt("ref_id");
			}

//				source database configuration 

			SureDatasourceEntity findBysourceName = surerepo.findByName(data_source_name);
			String source_username = findBysourceName.getUser_name();
			String source_password = findBysourceName.getPassword();
			String source_database = findBysourceName.getDatabase_name();
			String source_url = findBysourceName.getDb_host_name() + ":" + findBysourceName.getPortnumber() + "/"
					+ source_database;
			String data_source_type = findBysourceName.getData_source_type();

			Connection source_connection = connectionServices.Connection(data_source_type, source_username,
					source_password, source_url);
//			Connection source_connection = DriverManager.getConnection(source_url, source_username, source_password);

			Statement table_stmt = source_connection.createStatement();
			String max_source_query = "SELECT MAX(id) As max_id FROM " + source_table;
			ResultSet max_table_rs = table_stmt.executeQuery(max_source_query);
			if (max_table_rs.next()) {
				max_source_id = max_table_rs.getInt("max_id");
			}

//					selecting table data from source table 
			String table_query = "";
			String filterandtransform = filterService.filterandtransform(id, node_id, "source").getBody().toString();

			if (filterandtransform.contains("where") || filterandtransform.contains("WHERE")) {
				table_query = filterandtransform + " AND id " + "BETWEEN " + max_store_id + " AND " + max_source_id;
			} else {

				table_query = filterandtransform + " " + "WHERE id " + "BETWEEN " + max_store_id + " AND "
						+ max_source_id;
			}
			ResultSet table_rs = table_stmt.executeQuery(table_query);
//					Getting meta data 
			ResultSetMetaData data = table_rs.getMetaData();
			int column_count = data.getColumnCount();

//					count the column and create query String that create a column in target Database 
			if (max_source_id == max_store_id) {
				return new ResponseEntity<>(new ResponseMessage("Data Inserted Successfully "), HttpStatus.ACCEPTED);
			}
			table_rs.next();
			while (table_rs.next()) {
				int i = 1;
				count_id += 1;
				StringBuilder insert_data = new StringBuilder();
				insert_data.append("INSERT into " + database_name + "." + store_table + " VALUES( " + count_id + ",");
				for (; i <= column_count; i++) {
					if (i == column_count) {
						if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
								|| data.getColumnTypeName(i).contains("date"))
							insert_data.append(",'" + table_rs.getString(data.getColumnName(i)) + "'");
						else
							insert_data.append("," + table_rs.getString(data.getColumnName(i)));
					} else {
						if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
								|| data.getColumnTypeName(i).contains("date"))
							insert_data.append(",'" + table_rs.getString(data.getColumnName(i)) + "'");
						else
							insert_data.append("" + table_rs.getString(data.getColumnName(i)));
					}
				}
				insert_data.append(")");
				PreparedStatement test = store_connnection.prepareStatement(insert_data.toString());
				test.execute();
			}
			store_connnection.close();
			source_connection.close();
			return new ResponseEntity<>(new ResponseMessage("Data Inserted Successfully "), HttpStatus.ACCEPTED);
		} catch (SQLException sql) {
			System.out.println(sql);
			return new ResponseEntity<>(new ResponseMessage("Something Went Wrong"), HttpStatus.BAD_REQUEST);

		}
	}

//	initial incremental only 
	@GetMapping("/incrementaluploadonly/{id}/{node_id}")
	public ResponseEntity<?> increamtnaUploadObly(@PathVariable Long id, @PathVariable Integer node_id)
			throws SQLException, JsonProcessingException {

		SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);
		String str = lines.getModel();

//		String str = "[{\"title\":\"abc\",\"type\":\"ENTITIES\",\"id\":\"1\",\"storetable\":\"newtable4\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"},"
//				+ "{\"title\":\"USER\",\"type\":\"ENTITIES\",\"id\":\"2\",\"storetable\":\"USER\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"},"
//				+ "{\"title\":\"POSITION\",\"type\":\"ENTITIES\",\"id\":\"3\",\"storetable\":\"POSITION\", \"CRON\":\"0/5 * * * * ?\", \"create_new_table\":\"Y\", \"refresh_type\":\"incremental_only\", \"active\":\"Y\"}]";

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(str);
		JsonArray array = element.getAsJsonArray();
		Iterator iterator = array.iterator();

		String source_table = "";
		String store_table = "";

		Boolean auto_mapping = true;

		while (iterator.hasNext()) {

			Object next = iterator.next();
			JsonElement parse = parser.parse(next.toString());
			JsonObject jsonObject = parse.getAsJsonObject();
			int i = jsonObject.get("id").getAsInt();

			if (i == node_id) {
				source_table = jsonObject.get("title").getAsString();
				store_table = jsonObject.get("storetable").getAsString();
//				auto_mapping = jsonObject.get("create_new_table").getAsBoolean();
				break;
			}

		}

//		Getting credential form dataflow table 
		DataflowModel model = dataflowServiceImpl.getDataflowById(id);
		String data_store_name = model.getSelect_data_store();
		String data_source_name = model.getSelect_data_source();

		Boolean createTable = createTableforIncremantal(id, source_table, store_table);
		if (createTable) {
			return new ResponseEntity<>(new ResponseMessage("incremental uploaded stated "), HttpStatus.ACCEPTED);
		}
//		data Source Configuration getting from dataflow table

		try {
//	Data Store Configuration getting from dataflow table

			SureDataEntity findByName = datarepo.findByName(data_store_name);
			Long store_id = findByName.getId();
			String database_name = findByName.getDatabase_name();
			String store_username = findByName.getUser_name();
			String store_password = findByName.getPassword();
			String url = findByName.getDb_host_name() + ":" + findByName.getPortnumber() + "/" + database_name;
			String data_store_type = findByName.getData_store_type();

//			GET CONNECTION TO DATABSE
			Connection store_connnection = connectionServices.Connection(data_store_type, store_username,
					store_password, url);
//			Connection store_connnection = DriverManager.getConnection(url, store_username, store_password);

//			Auto increment in data store 
			int count_id = 0;
			int max_store_id = 0;
			int max_source_id = 0;

			String max_query = "SELECT MAX(ref_id) As ref_id FROM " + store_table;

			String id_max_query = "SELECT MAX(id) As max_id FROM " + store_table;

			PreparedStatement stmt_tab = store_connnection.prepareStatement(max_query);
			ResultSet count_table = stmt_tab.executeQuery();

			PreparedStatement stmt_tab2 = store_connnection.prepareStatement(id_max_query);
			ResultSet store_table_rs = stmt_tab2.executeQuery();

			if (store_table_rs.next()) {
				max_store_id = store_table_rs.getInt("max_id");
			}
			if (count_table.next()) {
				count_id = count_table.getInt("ref_id");
			}

//		source database configuration 

			SureDatasourceEntity findBysourceName = surerepo.findByName(data_source_name);
			String source_username = findBysourceName.getUser_name();
			String source_password = findBysourceName.getPassword();
			String source_database = findBysourceName.getDatabase_name();
			String source_url = findBysourceName.getDb_host_name() + ":" + findBysourceName.getPortnumber() + "/"
					+ source_database;
			String data_source_type = findBysourceName.getData_source_type();

//			GET CONNECTION TO DATABSE
			Connection source_connection = connectionServices.Connection(data_source_type, source_username,
					source_password, source_url);
//			Connection source_connection = DriverManager.getConnection(source_url, source_username, source_password);

			Statement table_stmt = source_connection.createStatement();
			String max_source_query = "SELECT MAX(id) As max_id FROM " + source_table;
			ResultSet max_table_rs = table_stmt.executeQuery(max_source_query);
			if (max_table_rs.next()) {
				max_source_id = max_table_rs.getInt("max_id");
			}

//			HERE WE GET QUERY FROM FILTER AND TRANSFORM
			ResponseEntity<?> filterandtransform = filterService.filterandtransform(id, node_id, "source");

			String tabledata_query = filterandtransform.getBody().toString();
//			selecting table data from source table 
			String table_query = "";
//			max_store_id = max_store_id + 1;

			String singlequery = "SELECT * FROM " + source_database + "." + source_table + "    ";
			if (tabledata_query.contains(singlequery)) {
				table_query = tabledata_query + " WHERE id " + "BETWEEN " + max_store_id + " AND " + max_source_id;

			} else {

				table_query = tabledata_query + " AND id " + "BETWEEN " + max_store_id + " AND " + max_source_id;
			}
//			table_query = "SELECT * FROM " + source_table + " " + "WHERE id " + "BETWEEN " + max_store_id
//					+ " AND " + max_source_id;
			ResultSet table_rs = table_stmt.executeQuery(table_query);

//			Getting meta data 
			ResultSetMetaData data = table_rs.getMetaData();
			int column_count = data.getColumnCount();

			StringBuilder value_query = new StringBuilder();
			value_query.append("( ref_id, ");
			for (int i = 1; i <= column_count; i++) {
				if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")) {

					value_query.append(data.getColumnName(i) + ", ");
				} else {
					value_query.append(data.getColumnName(i) + ", ");
				}

			}
			value_query.deleteCharAt(value_query.length() - 2);
			value_query.append(")");

//			count the column and create query String that create a column in target Database 
			if (max_source_id == max_store_id) {
				return new ResponseEntity<>(new ResponseMessage("Data Inserted Successfully "), HttpStatus.ACCEPTED);
			}
//			table_rs.next();
			while (table_rs.next()) {
				int i = 1;
				count_id += 1;
				StringBuilder insert_data = new StringBuilder();

				insert_data.append("INSERT into " + database_name + "." + store_table + " " + value_query + " VALUES( "
						+ count_id + ",");
				for (; i <= column_count; i++) {
					if (i == column_count) {
						if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
								|| data.getColumnTypeName(i).contains("date"))
							insert_data.append(",'" + table_rs.getString(data.getColumnName(i)) + "'");
						else
							insert_data.append("," + table_rs.getString(data.getColumnName(i)));
					} else {
						if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
								|| data.getColumnTypeName(i).contains("date"))
							insert_data.append(",'" + table_rs.getString(data.getColumnName(i)) + "'");
						else
							insert_data.append("" + table_rs.getString(data.getColumnName(i)));
					}
				}
				insert_data.append(")");
				PreparedStatement test = store_connnection.prepareStatement(insert_data.toString());
				test.execute();
			}
			store_connnection.close();
			source_connection.close();
			return new ResponseEntity<>(new ResponseMessage("Data Inserted Successfully "), HttpStatus.ACCEPTED);
		} catch (SQLException sql) {
			System.out.println(sql);
			return new ResponseEntity<>(new ResponseMessage("Something Went Wrong"), HttpStatus.BAD_REQUEST);

		}
	}

	public Boolean createTable(Long id, String source_table, String store_table, Integer node_id)
			throws SQLException, JsonProcessingException {

		DataflowModel model = dataflowServiceImpl.getDataflowById(id);

		String data_store_name = model.getSelect_data_store();
		String data_source_name = model.getSelect_data_source();
		SureDataEntity findByName = datarepo.findByName(data_store_name);

//			create a database at data store server
		String store_username = findByName.getUser_name();
		String store_password = findByName.getPassword();
		String database = findByName.getDatabase_name();
		String db_url = findByName.getDb_host_name() + ":" + findByName.getPortnumber() + "/" + database;
		String data_store_type = findByName.getData_store_type();
		String store_database = findByName.getDatabase_name();
//			connecting to store's created database 

//		GET CONNECTION TO DATABSE
		Connection store_connnection = connectionServices.Connection(data_store_type, store_username, store_password,
				db_url);
//		Connection store_connnection = DriverManager.getConnection(db_url, store_username, store_password);

//		connect to source database
		SureDatasourceEntity findBysourceName = surerepo.findByName(data_source_name);
		Long source_id = findBysourceName.getId();
		SureDatasourceEntity sureDataSource = surerepo.findById(source_id).get();
		String source_username = sureDataSource.getUser_name();
		String source_password = sureDataSource.getPassword();
		String source_database = sureDataSource.getDatabase_name();
		String source_url = sureDataSource.getDb_host_name() + ":" + sureDataSource.getPortnumber() + "/"
				+ source_database;
		String data_source_type = sureDataSource.getData_source_type();

		Connection source_connection = connectionServices.Connection(data_source_type, source_username, source_password,
				source_url);
//		Connection source_connection = DriverManager.getConnection(source_url, source_username, source_password);

		List<String> selecttablelist = new ArrayList<String>();

		String query_tab = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + database + "'";

//   Store Connection 

		Statement stmt_tab = store_connnection.createStatement();
		ResultSet rs_tab = stmt_tab.executeQuery(query_tab);

//	Getting table list of store if present 
		while (rs_tab.next()) {
			String tableName = rs_tab.getString("table_name");
			selecttablelist.add(tableName);
		}

//		WHEN STORE DATABASE DON'T HAVE TABLE
		if (!selecttablelist.contains(store_table)) {

//				selecting table data from source table 

//			HERE WE GET QUERY FROM FILTER AND TRANSFORM
			ResponseEntity<?> filterandtransform = filterService.filterandtransform(id, node_id, "source");

			String tabledata_query = filterandtransform.getBody().toString();

//			String table_query = "SELECT * FROM " + source_table + " ";
			Statement table_stmt = source_connection.createStatement();
			ResultSet table_rs = table_stmt.executeQuery(tabledata_query);

//				Getting meta data 
			ResultSetMetaData data = table_rs.getMetaData();
			int column_count = data.getColumnCount();
			StringBuilder insert_query = new StringBuilder();

//				count the column and create query String that create a column in target Database

			for (int i = 1; i <= column_count; i++) {
				if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")) {
					insert_query.append(data.getColumnName(i) + " " + data.getColumnTypeName(i) + "(400), ");

				} else {
					insert_query.append(data.getColumnName(i) + " " + data.getColumnTypeName(i) + ", ");
				}

			}

			// FOR GET ALL RECORD
//			ResponseEntity<?> fandt = filterService.filterandtransform(id,node_id,"store");
//			String mapdata_query = fandt.getBody().toString();
			ResultSet table_data_rs = table_stmt.executeQuery(tabledata_query);
			ResultSetMetaData table_data = table_data_rs.getMetaData();
			int table_column_count = table_data.getColumnCount();

//				count the column and create query String that create a column in target Database
			StringBuilder value_query = new StringBuilder();
			value_query.append("( ref_id, ");
			for (int i = 1; i <= table_column_count; i++) {
				if (table_data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")) {

					value_query.append(table_data.getColumnName(i) + ", ");
				} else {
					value_query.append(table_data.getColumnName(i) + ", ");
				}

			}
			value_query.deleteCharAt(value_query.length() - 2);
			value_query.append(")");

			String create_table = "CREATE TABLE " + store_table + "(" + " ref_id int," + insert_query.toString()
					+ " PRIMARY KEY (ref_id)" + ")";
			String valuestorequery = filterService.createstorequery(id, node_id, value_query.toString()).getBody()
					.toString();

			ResponseEntity<?> createstorequery = filterService.createstorequery(id, node_id, create_table);
			String createstoretable = createstorequery.getBody().toString();

//				CHECK WHERE STORE HAS TABLE OR NOT

			PreparedStatement preparedStatement = store_connnection.prepareStatement(createstoretable);
			preparedStatement.execute();

//				Data Store Configuration getting from dataflow table

//						Auto increment in data store 
			int count_id = 0;
			String max_query = "SELECT MAX(ref_id) As ref_id FROM " + store_table;
			PreparedStatement stmt_tab2 = store_connnection.prepareStatement(max_query);
			ResultSet count_table = stmt_tab2.executeQuery();

//		 need to modification
			if (!count_table.isBeforeFirst()) {

				if (count_table.next()) {
					count_id = count_table.getInt("max_id");
				}
			}

//			count the column and create query String that create a column in target Database 
			int recourd_count = 0;
			while (table_data_rs.next()) {
				int i = 1;
				count_id += 1;
				StringBuilder insert_data = new StringBuilder();
				insert_data.append("INSERT into " + store_database + "." + store_table + " " + valuestorequery
						+ " VALUES( " + count_id + ",");
				for (; i <= table_column_count; i++) {
					if (i == table_column_count) {
						if (table_data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
								|| table_data.getColumnTypeName(i).contains("date"))
							insert_data.append(",'" + table_data_rs.getString(table_data.getColumnName(i)) + "'");
						else
							insert_data.append("," + table_data_rs.getString(table_data.getColumnName(i)));
					} else {
						if (table_data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
								|| table_data.getColumnTypeName(i).contains("date"))
							insert_data.append(",'" + table_data_rs.getString(table_data.getColumnName(i)) + "'");
						else
							insert_data.append("" + table_data_rs.getString(table_data.getColumnName(i)));
					}
				}
				insert_data.append(")");
				PreparedStatement test = store_connnection.prepareStatement(insert_data.toString());
				boolean execute = test.execute();
				if (!execute) {
					recourd_count++;
				}
			}

			int row = table_data_rs.getStatement().getFetchSize();
			System.out.println("row size = " + row);

			sErrorService.success(recourd_count, query_tab);
			store_connnection.close();
			source_connection.close();
			return true;
		} else {
			return false;
//			sErrorService.error("table already exist", query_tab, "jobname", "dataflow");

		}

	}

	public Boolean createTableforIncremantal(Long id, String source_table, String store_table) throws SQLException {

		DataflowModel model = dataflowServiceImpl.getDataflowById(id);

		String data_store_name = model.getSelect_data_store();
		String data_source_name = model.getSelect_data_source();
		SureDataEntity findByName = datarepo.findByName(data_store_name);

//			create a database at data store server
		String store_username = findByName.getUser_name();
		String store_password = findByName.getPassword();
		String database = findByName.getDatabase_name();
		String db_url = findByName.getDb_host_name() + ":" + findByName.getPortnumber() + "/" + database;
		String data_store_type = findByName.getData_store_type();

//			connecting to store's created database 
		Connection store_connnection = connectionServices.Connection(data_store_type, store_username, store_password,
				db_url);
//		Connection store_connnection = DriverManager.getConnection(db_url, store_username, store_password);

//		connect to source database
		SureDatasourceEntity findBysourceName = surerepo.findByName(data_source_name);
		Long source_id = findBysourceName.getId();
		SureDatasourceEntity sureDataSource = surerepo.findById(source_id).get();
		String source_username = sureDataSource.getUser_name();
		String source_password = sureDataSource.getPassword();
		String source_database = sureDataSource.getDatabase_name();
		String source_url = sureDataSource.getDb_host_name() + ":" + sureDataSource.getPortnumber() + "/"
				+ source_database;
		String data_source_type = sureDataSource.getData_source_type();

//		connection establish
		Connection source_connection = connectionServices.Connection(data_source_type, source_username, source_password,
				source_url);
//		Connection source_connection = DriverManager.getConnection(source_url, source_username, source_password);

		List<String> selecttablelist = new ArrayList<String>();

		String query_tab = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + database + "'";

//   Store Connection 

		Statement stmt_tab = store_connnection.createStatement();
		ResultSet rs_tab = stmt_tab.executeQuery(query_tab);

//	Getting table list of store if present 
		while (rs_tab.next()) {
			String tableName = rs_tab.getString("table_name");
			selecttablelist.add(tableName);
		}

//				provide a logic to match with two list string whether it has that string value or not 
		if (!selecttablelist.contains(store_table)) {

//				selecting table data from source table 

			int max_source_id = 0;
			Statement table_stmt = source_connection.createStatement();
			String max_source_query = "SELECT MAX(id) As max_id FROM " + source_table;
			ResultSet max_table_rs = table_stmt.executeQuery(max_source_query);
			if (max_table_rs.next()) {
				max_source_id = max_table_rs.getInt("max_id");
			}

			String table_query = "SELECT * FROM " + source_table + " where id=" + max_source_id;

			ResultSet table_rs = table_stmt.executeQuery(table_query);

//				Getting meta data 
			ResultSetMetaData data = table_rs.getMetaData();
			int column_count = data.getColumnCount();
			StringBuilder insert_query = new StringBuilder();

//				count the column and create query String that create a column in target Database

			for (int i = 1; i <= column_count; i++) {
				if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR"))
					insert_query.append(data.getColumnName(i) + " " + data.getColumnTypeName(i) + "(400), ");
				else
					insert_query.append(data.getColumnName(i) + " " + data.getColumnTypeName(i) + ", ");
			}

			String create_table = "CREATE TABLE " + store_table + "(" + " ref_id int," + insert_query.toString()
					+ " PRIMARY KEY (ref_id)" + ")";

//				Connection 2 is instance of data store i.e where we have to save data 
			PreparedStatement preparedStatement = store_connnection.prepareStatement(create_table);
			preparedStatement.execute();

//				Data Store Configuration getting from dataflow table

//						Auto increment in data store 

//						count the column and create query String that create a column in target Database 
			while (table_rs.next()) {
				int i = 1;

				StringBuilder insert_data = new StringBuilder();
				insert_data.append("INSERT into " + store_table + " VALUES( " + 1 + ",");
				for (; i <= column_count; i++) {
					if (i == column_count) {
						if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
								|| data.getColumnTypeName(i).contains("date"))
							insert_data.append("," + table_rs.getString(data.getColumnName(i)) + "'");
						else
							insert_data.append("," + table_rs.getString(data.getColumnName(i)));
					} else {
						if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
								|| data.getColumnTypeName(i).contains("date"))
							insert_data.append(",'" + table_rs.getString(data.getColumnName(i)) + "'");
						else
							insert_data.append("" + table_rs.getString(data.getColumnName(i)));
					}
				}
				insert_data.append(")");
				PreparedStatement test = store_connnection.prepareStatement(insert_data.toString());
				test.execute();
			}
			store_connnection.close();
			source_connection.close();
			return true;
		}
		return false;

	}
	
	
}
