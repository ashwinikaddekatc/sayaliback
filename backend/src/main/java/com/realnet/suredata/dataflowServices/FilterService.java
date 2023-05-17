package com.realnet.suredata.dataflowServices;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.realnet.suredata.Services.DatabaseConnectionServices;
import com.realnet.suredata.entity.DataflowModel;
import com.realnet.suredata.entity.SureDataFlow_lines;
import com.realnet.suredata.entity.SureDatasourceEntity;
import com.realnet.suredata.repository.DataflowRepository;
import com.realnet.suredata.repository.DataflowineRepository;
import com.realnet.suredata.repository.SureDataRepository;
import com.realnet.suredata.repository.SuredatasourceRepository;

@Service
public class FilterService {

	@Autowired
	private SuredatasourceRepository sourcerepo;

	@Autowired
	private SureDataRepository datarepo;

	@Autowired
	private DataflowRepository dataflowRepository;

	@Autowired
	DataflowServiceImpl dataflowServiceImpl;

	@Autowired
	private DataflowineRepository flowrepo;

	@Autowired
	DatabaseConnectionServices connectionServices;

	public ResponseEntity<?> filterandtransform(Long id, int node_id, String jobtype)
			throws SQLException, JsonProcessingException {

		DataflowModel dataflow = dataflowRepository.findById(id).get();
		boolean auto_table_mapping = dataflow.isAuto_table_mapping();

		DataflowModel model = dataflowServiceImpl.getDataflowById(id);
		SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);

		HashMap<String, String> filter_map = new HashMap<>();

		HashMap<String, HashMap<String, String>> filterhashmap = new HashMap<>();
//		filter_map.put("companyname", "gyan");

		List<String> transform_list = new ArrayList<>();
//		transform_list.add("companyname");

//		String table_name = "about_workpost";
		String table_name = "";

		String filter_name = "";
		String column_name = "";
		String filter_data = "";

		String str = lines.getModel();

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(str);

		JsonArray array = element.getAsJsonArray();
		Iterator iterator = array.iterator();

//		String source_table = "";
//		String store_table = "";

//		Boolean auto_mapping = true;

		while (iterator.hasNext()) {

			Object next = iterator.next();
			JsonElement parse = parser.parse(next.toString());
			JsonObject jsonObject = parse.getAsJsonObject();
			int i = jsonObject.get("id").getAsInt();

			if (i == node_id) {
				table_name = jsonObject.get("title").getAsString();

				String filt = jsonObject.get("filters").getAsString();
				JsonElement filte = parser.parse(filt);

				JsonArray filter = filte.getAsJsonArray();

//				JsonArray filter = jsonObject.get("filters").getAsJsonArray();
				for (JsonElement fil : filter) {
					JsonObject object = fil.getAsJsonObject();

					String andor = object.get("andor").toString().replaceAll("\"", "");
					String fields_name = object.get("fields_name").toString().replaceAll("\"", "");

					String value = object.get("value").toString().replaceAll("\"", "");
					filter_map.put(fields_name, value);
					filterhashmap.put(andor, filter_map);

				}

				if (auto_table_mapping) {
					String trans = jsonObject.get("mappers").toString();
					if (!trans.isEmpty()) {
						String transform = jsonObject.get("mappers").getAsString();

						JsonElement ele = parser.parse(transform);

						JsonArray array2 = ele.getAsJsonArray();

//				JsonArray filter = jsonObject.get("filters").getAsJsonArray();
						for (JsonElement fil : array2) {
							JsonObject object = fil.getAsJsonObject();

							String fieldname = object.get("fieldname").toString().replaceAll("\"", "");

							String mapped_fields = object.get("mapped_fields").toString().replaceAll("\"", "");
							if (jobtype.contains("source")) {
								transform_list.add(mapped_fields);

							} else if (jobtype.contains("store")) {
								transform_list.add(fieldname);

							}

						}
					}
				}

//				table_name = jsonObject.get("storetable").getAsString();
//						auto_mapping = jsonObject.get("create_new_table").getAsBoolean();
				break;
			}

		}

		String data_source_name = model.getSelect_data_source();
		SureDatasourceEntity findByName = sourcerepo.findByName(data_source_name);
		Long source_id = findByName.getId();
		SureDatasourceEntity sureDataEntity = sourcerepo.findById(source_id).get();
		String database = sureDataEntity.getDatabase_name();

		String filterquery = "SELECT * FROM " + database + "." + table_name + "    ";

//		 HERE WE TRANSFROM DATA

		if (!transform_list.isEmpty() || transform_list != null) {

			for (String column_name1 : transform_list) {
				column_name = column_name1;

				int size = transform_list.size();
				if (size == 1) {
					filterquery = "SELECT " + "id, " + column_name + " from " + database + "." + table_name;
				} else {
					StringBuilder columnNames = new StringBuilder();
					columnNames.append("id, ");
					for (String filterColumn : transform_list) {
						columnNames.append(filterColumn).append(",");
					}
					columnNames.deleteCharAt(columnNames.length() - 1);
					filterquery = "SELECT " + columnNames.toString() + " from " + database + "." + table_name;
				}
			}
		}

//			HERE WE FILTER DATA
		if (!transform_list.isEmpty() && !filter_map.isEmpty() && filter_map != null && transform_list != null) {
			filterquery = filterquery + " where ";
		} else if (!filter_map.isEmpty()) {
			filterquery = "SELECT * FROM " + database + "." + table_name + " where ";

		}

		if (!filterhashmap.isEmpty()) {

			Set<Entry<String, HashMap<String, String>>> entrySet2 = filterhashmap.entrySet();

			for (Entry<String, HashMap<String, String>> jsonElement : entrySet2) {
				filter_name = jsonElement.getKey().toString().replaceAll("\"", "");
				Set<Entry<String, String>> entrySet = jsonElement.getValue().entrySet();

//			Set<Entry<String, String>> entrySet = filter_map.entrySet();
				for (Entry<String, String> map : entrySet) {

					column_name = map.getKey().toString().replaceAll("\"", "");
					filter_data = map.getValue().toString().replaceAll("\"", "");

					int size = entrySet.size();
					if (size == 1) {

						filterquery = filterquery + " " + column_name + " ='" + filter_data + "'    ";

					} else {
						filterquery = filterquery + " " + column_name + " ='" + filter_data + "' " + filter_name;
					}
				}
			}

			String query = filterquery.substring(0, filterquery.length() - filter_name.length() - 1);

			filterquery = query;
		}
		System.out.println(filterquery);

		return new ResponseEntity<>(filterquery, HttpStatus.OK);

	}

	public ResponseEntity<?> createstorequery(Long id, int node_id, String query)
			throws SQLException, JsonProcessingException {

		DataflowModel dataflow = dataflowRepository.findById(id).get();
		boolean auto_table_mapping = dataflow.isAuto_table_mapping();

		SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);

		String replacequery = query;

		String str = lines.getModel();

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(str);

		JsonArray array = element.getAsJsonArray();
		Iterator iterator = array.iterator();

		while (iterator.hasNext()) {

			Object next = iterator.next();
			JsonElement parse = parser.parse(next.toString());
			JsonObject jsonObject = parse.getAsJsonObject();
			int i = jsonObject.get("id").getAsInt();

			if (i == node_id) {

				if (auto_table_mapping) {
					String trans = jsonObject.get("mappers").toString();
					if (!trans.isEmpty()) {

						String transform = jsonObject.get("mappers").getAsString();

						JsonElement ele = parser.parse(transform);

						JsonArray array2 = ele.getAsJsonArray();

//				JsonArray filter = jsonObject.get("filters").getAsJsonArray();
						for (JsonElement fil : array2) {
							JsonObject object = fil.getAsJsonObject();

							String fieldname = object.get("fieldname").toString().replaceAll("\"", "");

							String mapped_fields = object.get("mapped_fields").toString().replaceAll("\"", "");

							replacequery = replacequery.replace(mapped_fields, fieldname);

						}
					}
				}

//				table_name = jsonObject.get("storetable").getAsString();
//						auto_mapping = jsonObject.get("create_new_table").getAsBoolean();
				break;
			}
		}
		return new ResponseEntity<>(replacequery, HttpStatus.OK);
	}

//	public boolean filter(Long id, String table_name, String filterquery) throws SQLException {
//
//		String store_table = table_name;
//
//		try {
//			DataflowModel model = dataflowServiceImpl.getDataflowById(id);
//			String data_source_name = model.getSelect_data_source();
//			SureDatasourceEntity findByName = sourcerepo.findByName(data_source_name);
//
////		List<String> list = getAllTableListById(id);
//			List<Map<String, String>> list = new ArrayList<>();
//			Long source_id = findByName.getId();
//			SureDatasourceEntity sureDataEntity = sourcerepo.findById(source_id).get();
//			String database = sureDataEntity.getDatabase_name();
//			String query = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + database + "'";
//
//			String username = sureDataEntity.getUser_name();
//			String password = sureDataEntity.getPassword();
//			String db_url = sureDataEntity.getDb_host_name() + ":" + sureDataEntity.getPortnumber() + "/" + database;
//			String data_source_type = sureDataEntity.getData_source_type();
//
////				GET CONNECTION TO DATABSE
//			Connection con = connectionServices.Connection(data_source_type, username, password, db_url);
//
////			store connection 
//			String data_store = model.getSelect_data_store();
//			SureDataEntity findByName2 = datarepo.findByName(data_store);
//			String store_username = findByName2.getUser_name();
//			String store_password = findByName2.getPassword();
//			String store_database = findByName2.getDatabase_name();
//			String store__url = findByName2.getDb_host_name() + ":" + findByName2.getPortnumber() + "/"
//					+ store_database;
//			String data_store_type = findByName2.getData_store_type();
//
////				connecting to store's created database 
//
////			GET CONNECTION TO DATABSE
//			Connection store_connnection = connectionServices.Connection(data_store_type, store_username,
//					store_password, store__url);
//
//			Statement stmt = con.createStatement();
//			ResultSet rs = stmt.executeQuery(query);
//
//			while (rs.next()) {
//				String tableName = rs.getString("TABLE_NAME");
//				if (tableName.equalsIgnoreCase(table_name)) {
//
//					ResultSet table_rs = stmt.executeQuery(filterquery);
////					Getting meta data 
//					ResultSetMetaData data = table_rs.getMetaData();
//					int column_count = data.getColumnCount();
//					StringBuilder insert_query = new StringBuilder();
//					StringBuilder value_query = new StringBuilder();
//					value_query.append("(");
//
////						count the column and create query String that create a column in target Database
//
//					for (int i = 1; i <= column_count; i++) {
//						if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")) {
//							insert_query.append(data.getColumnName(i) + " " + data.getColumnTypeName(i) + "(400), ");
//
//							value_query.append("'" + data.getColumnName(i) + "', ");
//						} else {
//							insert_query.append(data.getColumnName(i) + " " + data.getColumnTypeName(i) + ", ");
//							value_query.append("'" + data.getColumnName(i) + "', ");
//						}
//
//					}
//					value_query.deleteCharAt(value_query.length() - 2);
//					value_query.append(")");
//
//					String create_table = "CREATE TABLE " + store_table + "(" + " ref_id int," + insert_query.toString()
//							+ " PRIMARY KEY (ref_id)" + ")";
//					PreparedStatement preparedStatement = store_connnection.prepareStatement(create_table);
//
//					String store_query = "SELECT table_name FROM information_schema.tables WHERE table_schema = '"
//							+ store_database + "'";
//
////						Connection 2 is instance of data store i.e where we have to save data 
//					Statement storestmt = store_connnection.createStatement();
//					ResultSet rSet = storestmt.executeQuery(store_query);
//
//					if (rSet.toString().isEmpty()) {
//						boolean execute = preparedStatement.execute();
//
//					} else {
//
//						while (rSet.next()) {
//
//							String storetable = rSet.getString("TABLE_NAME");
//							if (!storetable.equalsIgnoreCase(table_name) || storetable.isEmpty()) {
//
//								boolean execute = preparedStatement.execute();
//
//							}
//						}
//
//					}
//
////						Data Store Configuration getting from dataflow table
//
////								Auto increment in data store 
//					int count_id = 0;
////					String max_query = "SELECT MAX(ref_id) As ref_id FROM " + store_table;
////					PreparedStatement stmt_tab2 = store_connnection.prepareStatement(max_query);
////					ResultSet count_table = stmt_tab2.executeQuery();
////					if (count_table.next()) {
////						count_id = count_table.getInt("max_id");
////					}
//
////					count the column and create query String that create a column in target Database 
//					while (table_rs.next()) {
//						int i = 1;
//						count_id += 1;
//						StringBuilder insert_data = new StringBuilder();
//						insert_data.append("INSERT into " + store_database + "." + store_table + " " + value_query
//								+ " VALUES( " + count_id + ",");
//						for (; i <= column_count; i++) {
//							if (i == column_count) {
//								if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
//										|| data.getColumnTypeName(i).contains("date"))
//									insert_data.append(",'" + table_rs.getString(data.getColumnName(i)) + "'");
//								else
//									insert_data.append("," + table_rs.getString(data.getColumnName(i)));
//							} else {
//								if (data.getColumnTypeName(i).equalsIgnoreCase("VARCHAR")
//										|| data.getColumnTypeName(i).contains("date"))
//									insert_data.append(",'" + table_rs.getString(data.getColumnName(i)) + "'");
//								else
//									insert_data.append("" + table_rs.getString(data.getColumnName(i)));
//							}
//						}
//						insert_data.append(")");
//						PreparedStatement test = store_connnection.prepareStatement(insert_data.toString());
//						test.execute();
//						System.out.println(insert_data.toString());
//					}
//					store_connnection.close();
//					table_rs.close();
//					con.close();
//
//				}
//
////				Map<String, String> map = new HashMap<String, String>();
////				map.put("id", String.valueOf(i));
////				map.put("title", tableName);
////				map.put("type", "source table");
////				list.add(map);
////				i++;
//
//			}
//			con.close();
//
//			return true;
//		} catch (
//
//		SQLException e) {
//			return false;
//		}
//	}

}
