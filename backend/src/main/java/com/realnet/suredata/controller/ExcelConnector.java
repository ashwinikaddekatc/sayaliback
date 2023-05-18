package com.realnet.suredata.controller;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.InputStreamResource;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.realnet.suredata.Services.DatabaseConnectionServices;
import com.realnet.suredata.dataflowServices.DataflowServiceImpl;
import com.realnet.suredata.dataflowServices.FilterService;
import com.realnet.suredata.entity.DataflowModel;
import com.realnet.suredata.entity.SureDataFlow_lines;
import com.realnet.suredata.entity.SureDatasourceEntity;
import com.realnet.suredata.repository.DataflowRepository;
import com.realnet.suredata.repository.DataflowineRepository;
import com.realnet.suredata.repository.SureDataRepository;
import com.realnet.suredata.repository.SuredatasourceRepository;

@RestController
@RequestMapping("api/excel")
public class ExcelConnector {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private FilterService filterService;
	
	@Autowired
	private DataflowineRepository flowrepo;

	@GetMapping("/templatetojson")
	public ResponseEntity<?> saveTemplateInJson(@RequestParam MultipartFile file) throws IOException {

		BufferedReader br;
		InputStream is = file.getInputStream();
		br = new BufferedReader(new InputStreamReader(is));

		Workbook workbook = WorkbookFactory.create(is);

		// Create a DataFormatter to format and get each cell's value as String
		DataFormatter dataFormatter = new DataFormatter();

		Sheet sheet = workbook.getSheetAt(0);

		// Getting number of columns in the Sheet
		int cols = sheet.getRow(0).getLastCellNum();
		int firstRowNum = sheet.getFirstRowNum();

		List<String> keys = new ArrayList<String>();
		List<JSONObject> jsonList = new ArrayList<JSONObject>();

		for (Row row : sheet) {
			if (row.getRowNum() == 0) {
				for (int i = 0; i < cols; i++) {
					String value = dataFormatter.formatCellValue(row.getCell(i));
					keys.add(value);
				}

			} else {
				JSONObject object = new JSONObject(); // create new object for each row

				for (int i = 0; i < cols; i++) {
					String key = keys.get(i);
					String value = dataFormatter.formatCellValue(row.getCell(i));

					object.put(key, value);
				}

				jsonList.add(object); // add object to list only once
			}
		}

		workbook.close();

		return new ResponseEntity<>(jsonList, HttpStatus.OK);
	}

//	@PostMapping("/jsonkeychange")
//  	public ResponseEntity<?> changeKeysOfJson(@RequestParam String newjson, @RequestParam String body)
//			throws IOException {
//
//		JsonParser parser = new JsonParser();
//		JsonElement element = parser.parse(newjson);
//		JsonElement element2 = parser.parse(body);
//		JsonObject object2 = element.getAsJsonObject();
//		JsonArray array = element2.getAsJsonArray();
//		Iterator iterator = array.iterator();
//
//		List<Map> jsonList = new ArrayList<Map>();
//
//		Set<String> keySet = object2.keySet();
//		Iterator<String> it = keySet.iterator();
//
////		String key = it.next();
//		while (iterator.hasNext()) {
//
//			Map<String, String> map = new HashMap<String, String>();
//			Object next = iterator.next();
//			JsonElement parse = parser.parse(next.toString());
//			JsonObject jsonObject = parse.getAsJsonObject();
//			for (String k : keySet) {
//				String next2 = object2.get(k).getAsString();
//				String value2 = jsonObject.get(k).getAsString();
//				map.put(next2, value2);
//			}
//
//			jsonList.add(map);
//
//		}
//
//		return new ResponseEntity<>(jsonList, HttpStatus.BAD_REQUEST);
//	}
	
	
	@PostMapping("/jsonkeychange")
    public ResponseEntity<?> changeKeysOfJson(@RequestParam String newjson, @RequestParam String body) {
        JsonParser parser = new JsonParser();
        JsonArray newJsonArray = parser.parse(newjson).getAsJsonArray();
        JsonArray bodyArray = parser.parse(body).getAsJsonArray();

        List<Map<String, String>> jsonList = new ArrayList<>();

        for (JsonElement newJsonElement : newJsonArray) {
            JsonObject newJsonObject = newJsonElement.getAsJsonObject();
            String fieldName = newJsonObject.get("fieldname").getAsString();
            String mappedField = newJsonObject.get("mapped_fields").getAsString();

            for (JsonElement bodyElement : bodyArray) {
                JsonObject bodyJsonObject = bodyElement.getAsJsonObject();

                JsonElement mappedFieldElement = bodyJsonObject.get(mappedField);
                if (mappedFieldElement != null && !mappedFieldElement.isJsonNull()) {
                    String value = mappedFieldElement.getAsString();

                    Map<String, String> map = new HashMap<>();
                    map.put(fieldName, value);
                    jsonList.add(map);
                }
            }
        }

        return new ResponseEntity<>(jsonList, HttpStatus.OK);
    }
	
	
	
	
	


	private String getInsertQuery(String tableName, Map<String, Object> data) {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append("INSERT INTO ");
		sqlBuilder.append(tableName);
		sqlBuilder.append(" (");
		sqlBuilder.append(String.join(", ", data.keySet()));
		sqlBuilder.append(") VALUES (");
		sqlBuilder.append(String.join(", ", Collections.nCopies(data.size(), "?")));
		sqlBuilder.append(")");
		return sqlBuilder.toString();
	}

	// saving the correct data and download the excel of incorrect data
	@PostMapping("/savedataDownloadExcel/{tableName}")
	public ResponseEntity<?> saveDataAndDownloadIncorrectData(@PathVariable("tableName") String tableName,
			@RequestBody List<Map<String, Object>> data) {
		List<Integer> insertedIndices = new ArrayList<>();
		List<Integer> failedIndices = new ArrayList<>();
		List<Map<String, Object>> failedData = new ArrayList<>();

		try {
			String sql = getInsertQuery(tableName, data.get(0));
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> row = data.get(i);
				Object[] values = row.values().toArray();
				try {
					jdbcTemplate.update(sql, values);
					insertedIndices.add(i);
				} catch (DataIntegrityViolationException e) {
					failedIndices.add(i);
					failedData.add(row);
				}
			}

			if (!failedData.isEmpty()) {
				Workbook workbook = new XSSFWorkbook();
				Sheet sheet = workbook.createSheet("Failed Records");

				// Add column headers to the worksheet
				Row headerRow = sheet.createRow(0);
				int columnIndex = 0;
				for (String key : failedData.get(0).keySet()) {
					Cell cell = headerRow.createCell(columnIndex++);
					cell.setCellValue(key);
				}

				// Add data rows to the worksheet
				int rowIndex = 1;
				for (Map<String, Object> row : failedData) {
					Row dataRow = sheet.createRow(rowIndex++);
					columnIndex = 0;
					for (Object value : row.values()) {
						Cell cell = dataRow.createCell(columnIndex++);
						cell.setCellValue(value.toString());
					}
				}

				// Write the workbook to a file
				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				workbook.write(outputStream);
				ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
				headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=failed_records.xlsx");
				ResponseEntity<InputStreamResource> response = new ResponseEntity<>(
						new InputStreamResource(inputStream), headers, HttpStatus.OK);
				return response;
			}

			return ResponseEntity.ok("Data saved successfully! Inserted indices: " + insertedIndices
					+ " Failed indices: " + failedIndices);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
		}
	}

	// ******************************NEW
	// CHANGES***********************************//

	// save data and return failed data with eror and exception field 
	@PostMapping("/DownloadExcelErEx/{tableName}")
	public ResponseEntity<InputStreamResource> DownloadIncorrectDatawithErExField(
			@PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data) {
		List<Integer> insertedIndices = new ArrayList<>();
		List<Integer> failedIndices = new ArrayList<>();
		List<Map<String, Object>> failedData = new ArrayList<>();

		try {
			String sql = getInsertQuery(tableName, data.get(0));
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> row = data.get(i);
				Object[] values = row.values().toArray();
				try {
					jdbcTemplate.update(sql, values);
					insertedIndices.add(i);
				} catch (DataIntegrityViolationException e) {
					failedIndices.add(i);
					row.put("Status", "Error");
					row.put("Exception", e.getMessage());
					failedData.add(row);
				}
			}

			if (!failedData.isEmpty()) {
				Workbook workbook = new XSSFWorkbook();
				Sheet sheet = workbook.createSheet("Failed Records");

				// Add column headers to the worksheet
				Row headerRow = sheet.createRow(0);
				int columnIndex = 0;
				for (String key : failedData.get(0).keySet()) {
					Cell cell = headerRow.createCell(columnIndex++);
					cell.setCellValue(key);
				}

				// Add data rows to the worksheet
				int rowIndex = 1;
				for (Map<String, Object> row : failedData) {
					Row dataRow = sheet.createRow(rowIndex++);
					columnIndex = 0;
					for (Object value : row.values()) {
						Cell cell = dataRow.createCell(columnIndex++);
						cell.setCellValue(value.toString());
					}
				}

				// Write the workbook to a file
				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				workbook.write(outputStream);
				ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
				headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=failed_records.xlsx");
				return ResponseEntity.ok().headers(headers).body(new InputStreamResource(inputStream));
			}

			return ResponseEntity.ok().body(null);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(null);
		}
	}
//***********************************************************************************************************************************//
	       //FOR AUTO TABLE CREATION AND WITH ERROR AND EXCEPTION WITHOUT MAPPING USE THIS API// 
	
	// DOWNLOAD EXCEL FILE WITH ALL THE DATA WITH ERROR AND EXCEPTION
	@PostMapping("/DownloadExcelWithErANDEx/{tableName}")
	public ResponseEntity<InputStreamResource> DownloadAllTheData(@PathVariable("tableName") String tableName,
			@RequestBody List<Map<String, Object>> data) {
		List<Map<String, Object>> processedData = new ArrayList<>();

		try {
			createTableIfNotExists(tableName, data.get(0));

			// Generate the SQL INSERT query based on the table name and the columns of the
			// first row
			String sql = getInsertQuery1(tableName, data.get(0));
			// String sql = getInsertQuery(tableName, data.get(0));
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> row = data.get(i);
				Object[] values = row.values().toArray();
				Map<String, Object> processedRow = new HashMap<>();
				try {
					jdbcTemplate.update(sql, values);
					processedRow.putAll(row);
					processedRow.put("Status", "Success");
					processedRow.put("Exception", "NA");
				} catch (DataIntegrityViolationException e) {
					processedRow.putAll(row);
					processedRow.put("Status", "Error");
					String exceptionMessage = extractExceptionMessage(e);
					processedRow.put("Exception", exceptionMessage);
				}
				processedData.add(processedRow);
			}

			if (!processedData.isEmpty()) {
				Workbook workbook = new XSSFWorkbook();
				Sheet sheet = workbook.createSheet("Failed Records");

				// Add column headers to the worksheet
				Row headerRow = sheet.createRow(0);
				int columnIndex = 0;
				for (String key : processedData.get(0).keySet()) {
					Cell cell = headerRow.createCell(columnIndex++);
					cell.setCellValue(key);
				}

				// Add data rows to the worksheet
				int rowIndex = 1;
				for (Map<String, Object> row : processedData) {
					Row dataRow = sheet.createRow(rowIndex++);
					columnIndex = 0;
					for (Object value : row.values()) {
						Cell cell = dataRow.createCell(columnIndex++);
						cell.setCellValue(value.toString());
					}
				}

				// Write the workbook to a file
				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				workbook.write(outputStream);
				ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
				headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=failed_records.xlsx");
				return ResponseEntity.ok().headers(headers).body(new InputStreamResource(inputStream));
			}

			return ResponseEntity.ok().body(null);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(null);
		}
	}

	private String extractExceptionMessage(DataIntegrityViolationException e) {
		String errorMessage = e.getMessage();
		int startIndex = errorMessage.indexOf("Incorrect ");
		int endIndex = errorMessage.indexOf("at row");
		if (startIndex != -1 && endIndex != -1) {
			return errorMessage.substring(startIndex, endIndex).trim();
		}
		return errorMessage;
	}

	

//	@PostMapping("/savedataDownloadExcel1/{tableName}")
//	public ResponseEntity<?> saveDataAndDownloadIncorrectData1(@PathVariable("tableName") String tableName,
//			@RequestBody List<Map<String, Object>> data) {
//		List<Integer> insertedIndices = new ArrayList<>();
//		List<Integer> failedIndices = new ArrayList<>();
//		List<Map<String, Object>> failedData = new ArrayList<>();
//
//		try {
//			Map<String, Object> firstRow = data.get(0);
//			createTableIfNotExists(tableName, firstRow);
//
//			String sql = getInsertQuery1(tableName, firstRow);
//			for (int i = 0; i < data.size(); i++) {
//				Map<String, Object> row = data.get(i);
//				Object[] values = row.values().toArray();
//				try {
//					jdbcTemplate.update(sql, values);
//					insertedIndices.add(i);
//				} catch (DataIntegrityViolationException e) {
//					failedIndices.add(i);
//					failedData.add(row);
//				}
//			}
//
//			if (!failedData.isEmpty()) {
//				Workbook workbook = new XSSFWorkbook();
//				Sheet sheet = workbook.createSheet("Failed Records");
//
//				// Add column headers to the worksheet
//				Row headerRow = sheet.createRow(0);
//				int columnIndex = 0;
//				for (String key : failedData.get(0).keySet()) {
//					Cell cell = headerRow.createCell(columnIndex++);
//					cell.setCellValue(key);
//				}
//
//				// Add data rows to the worksheet
//				int rowIndex = 1;
//				for (Map<String, Object> row : failedData) {
//					Row dataRow = sheet.createRow(rowIndex++);
//					columnIndex = 0;
//					for (Object value : row.values()) {
//						Cell cell = dataRow.createCell(columnIndex++);
//						cell.setCellValue(value.toString());
//					}
//				}
//
//				// Write the workbook to a file
//				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//				workbook.write(outputStream);
//				ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());
//
//				HttpHeaders headers = new HttpHeaders();
//				headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
//				headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=failed_records.xlsx");
//				ResponseEntity<InputStreamResource> response = new ResponseEntity<>(
//						new InputStreamResource(inputStream), headers, HttpStatus.OK);
//				return response;
//			}
//
//			return ResponseEntity.ok("Data saved successfully! Inserted indices: " + insertedIndices
//					+ " Failed indices: " + failedIndices);
//		} catch (Exception e) {
//			return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
//		}
//	}

	private String getInsertQuery1(String tableName, Map<String, Object> data) {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append("INSERT INTO ");
		sqlBuilder.append(tableName);
		sqlBuilder.append(" (");
		sqlBuilder.append(String.join(", ", data.keySet()));
		sqlBuilder.append(") VALUES (");
		sqlBuilder.append(String.join(", ", Collections.nCopies(data.size(), "?")));
		sqlBuilder.append(")");
		return sqlBuilder.toString();
	}

	private void createTableIfNotExists(String tableName, Map<String, Object> data) {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append("CREATE TABLE IF NOT EXISTS ");
		sqlBuilder.append(tableName);
		sqlBuilder.append(" (");

		// Check if "id" field exists in the data map
		if (data.containsKey("id")) {
			// Add "id" column as the first column
			sqlBuilder.append("id INT PRIMARY KEY, ");
		}

		for (Map.Entry<String, Object> entry : data.entrySet()) {
			String columnName = entry.getKey();
			Object columnValue = entry.getValue();

			// Skip adding "id" field again
			if (columnName.equalsIgnoreCase("id")) {
				continue;
			}

			if (columnName.equalsIgnoreCase("date") || columnName.equalsIgnoreCase("dob")) {
				sqlBuilder.append(columnName).append(" DATE, ");
			} else {
				sqlBuilder.append(columnName).append(" VARCHAR(255), ");
			}
		}

		sqlBuilder.delete(sqlBuilder.length() - 2, sqlBuilder.length()); // Remove the last comma and space
		sqlBuilder.append(")");

		jdbcTemplate.execute(sqlBuilder.toString());
	}

//**********************************filter Api*************************************//
	
// **************************************************************************************************************************************************************//
	
	                      //AUTO TABLE WITH FILTER//
	//here id is dataflow id
	@PostMapping("/saveAndDownloadDataFilter/{id}/{tableName}")
	public ResponseEntity<?> saveAndDownloadDataFilter(@PathVariable Long id,@PathVariable("tableName") String tableName,
			@RequestBody List<Map<String, Object>> data) throws JsonMappingException, JsonProcessingException {

		List<Integer> insertedIndices = new ArrayList<>();
		List<Integer> failedIndices = new ArrayList<>();
		List<Map<String, Object>> failedData = new ArrayList<>();
		
		SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);
		String str = lines.getModel();
		
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(str);
        String filtersJson = jsonNode.get(0).get("filters").asText();
       
		

		//  String filtersJson = "[{\"andor\":\"AND\",\"fields_name\":\"name\",\"condition\":\"=\",\"value\":\"gyana\"},{\"andor\":\"AND\",\"fields_name\":\"id\",\"condition\":\"=\",\"value\":\"5\"}]";

		try {
			// Parse the filters JSON string into a list of filter maps
			List<Map<String, String>> filters = new ObjectMapper().readValue(filtersJson,
					new TypeReference<List<Map<String, String>>>() {
					});

			Map<String, Object> firstRow = data.get(0);
			createTableIfNotExistsF(tableName, firstRow);

			String sql = getInsertQueryF(tableName, firstRow);
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> row = data.get(i);
				Object[] values = row.values().toArray();
				try {
					// Apply the filters to the insert query
					if (applyFilters(filters, row)) {
						jdbcTemplate.update(sql, values);
						insertedIndices.add(i);
					}
				} catch (DataIntegrityViolationException e) {
					failedIndices.add(i);
					failedData.add(row);
				}
			}

			if (!failedData.isEmpty()) {
				Workbook workbook = new XSSFWorkbook();
				Sheet sheet = workbook.createSheet("Failed Records");

				// Add column headers to the worksheet
				Row headerRow = sheet.createRow(0);
				int columnIndex = 0;
				for (String key : failedData.get(0).keySet()) {
					Cell cell = headerRow.createCell(columnIndex++);
					cell.setCellValue(key);
				}

				// Add data rows to the worksheet
				int rowIndex = 1;
				for (Map<String, Object> row : failedData) {
					Row dataRow = sheet.createRow(rowIndex++);
					columnIndex = 0;
					for (Object value : row.values()) {
						Cell cell = dataRow.createCell(columnIndex++);
						cell.setCellValue(value != null ? value.toString() : "");
					}
				}

				// Write the workbook to a file
				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				workbook.write(outputStream);
				ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
				headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=failed_records.xlsx");
				ResponseEntity<InputStreamResource> response = new ResponseEntity<>(
						new InputStreamResource(inputStream), headers, HttpStatus.OK);
				return response;
			}

			return ResponseEntity.ok("Data saved successfully! Inserted indices: " + insertedIndices
					+ " Failed indices: " + failedIndices);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
		}
	}

	private String getInsertQueryF(String tableName, Map<String, Object> data) {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append("INSERT INTO ");
		sqlBuilder.append(tableName);
		sqlBuilder.append(" (");
		sqlBuilder.append(String.join(", ", data.keySet()));
		sqlBuilder.append(") VALUES (");
		sqlBuilder.append(String.join(", ", Collections.nCopies(data.size(), "?")));
		sqlBuilder.append(")");
		return sqlBuilder.toString();
	}

	private void createTableIfNotExistsF(String tableName, Map<String, Object> data) {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append("CREATE TABLE IF NOT EXISTS ");
		sqlBuilder.append(tableName);
		sqlBuilder.append(" (");

		// Check if "id" field exists in the data map
		if (data.containsKey("id")) {
			// Add "id" column as the first column
			sqlBuilder.append("id INT PRIMARY KEY, ");
		}

		for (Map.Entry<String, Object> entry : data.entrySet()) {
			String columnName = entry.getKey();
			Object columnValue = entry.getValue();

			// Skip adding "id" field again
			if (columnName.equalsIgnoreCase("id")) {
				continue;
			}

			if (columnName.equalsIgnoreCase("date") || columnName.equalsIgnoreCase("dob")) {
				sqlBuilder.append(columnName).append(" DATE, ");
			} else {
				sqlBuilder.append(columnName).append(" VARCHAR(255), ");
			}
		}

		sqlBuilder.delete(sqlBuilder.length() - 2, sqlBuilder.length()); // Remove the last comma and space
		sqlBuilder.append(")");

		jdbcTemplate.execute(sqlBuilder.toString());
	}

	private boolean applyFilters(List<Map<String, String>> filters, Map<String, Object> row) {
		for (Map<String, String> filter : filters) {
			String field = filter.get("fields_name");
			String condition = filter.get("condition");
			String value = filter.get("value");

			// Check if the filter condition matches the row data
			if (!row.containsKey(field)) {
				return false; // Skip this row if the field doesn't exist
			}
			Object fieldValue = row.get(field);
			if (!checkCondition(fieldValue, condition, value)) {
				return false; // Skip this row if the condition is not met
			}
		}
		return true; // All filters passed, include this row
	}

	private boolean checkCondition(Object fieldValue, String condition, String value) {
		// Perform the comparison based on the condition
		if ("=".equals(condition)) {
			return fieldValue.equals(value);
		} else if (">".equals(condition)) {
			return compareValues(fieldValue, value) > 0;
		} else if ("<".equals(condition)) {
			return compareValues(fieldValue, value) < 0;
		}

		return false; // Invalid condition
	}

	private int compareValues(Object fieldValue, String value) {
		if (fieldValue instanceof Integer) {
			Integer fieldValueInt = (Integer) fieldValue;
			Integer valueInt = Integer.parseInt(value);
			return fieldValueInt.compareTo(valueInt);
		} else if (fieldValue instanceof String) {
			String fieldValueStr = (String) fieldValue;
			return fieldValueStr.compareTo(value);
		}
		return 0; // Unable to compare
	}
	
	
//*************************************************************************************************************************************************************************************************************************//	
	                    //AUTO TABLE WITH TRANSFORM API START//
	
	@PostMapping("/saveAndDownloadDataTransform/{id}/{tableName}")
	public ResponseEntity<?> saveAndDownloadDataTransform(@PathVariable Long id,
	        @PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data)
	        throws JsonMappingException, JsonProcessingException {

	    List<Integer> insertedIndices = new ArrayList<>();
	    List<Integer> failedIndices = new ArrayList<>();
	    List<Map<String, Object>> failedData = new ArrayList<>();

	    String transformJson = "[{\"column\":\"address\",\"datatype\":\"varchar\"},{\"column\":\"dob\",\"datatype\":\"date\"}]";
	    

	    try {
	        // Parse the transform JSON string into a list of transform maps
	        List<Map<String, String>> transformations = new ObjectMapper().readValue(transformJson,
	                new TypeReference<List<Map<String, String>>>() {
	                });

	        Map<String, Object> firstRow = data.get(0);
	        createTableIfNotExistsT(tableName, transformations);

	        String sql = getInsertQueryT(tableName, firstRow, transformations);
	        for (int i = 0; i < data.size(); i++) {
	            Map<String, Object> row = data.get(i);
	            Object[] values = transformRow(row, transformations);
	            try {
	                jdbcTemplate.update(sql, values);
	                insertedIndices.add(i);
	            } catch (DataIntegrityViolationException e) {
	                failedIndices.add(i);
	                failedData.add(row);
	            }
	        }

	        if (!failedData.isEmpty()) {
	            Workbook workbook = new XSSFWorkbook();
	            Sheet sheet = workbook.createSheet("Failed Records");

	            // Add column headers to the worksheet
	            Row headerRow = sheet.createRow(0);
	            int columnIndex = 0;
	            for (String key : failedData.get(0).keySet()) {
	                Cell cell = headerRow.createCell(columnIndex++);
	                cell.setCellValue(key);
	            }

	            // Add data rows to the worksheet
	            int rowIndex = 1;
	            for (Map<String, Object> row : failedData) {
	                Row dataRow = sheet.createRow(rowIndex++);
	                columnIndex = 0;
	                for (Object value : row.values()) {
	                    Cell cell = dataRow.createCell(columnIndex++);
	                    cell.setCellValue(value != null ? value.toString() : "");
	                }
	            }

	            // Write the workbook to a file
	            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	            workbook.write(outputStream);
	            ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

	            HttpHeaders headers = new HttpHeaders();
	            headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
	            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=failed_records.xlsx");
	            ResponseEntity<InputStreamResource> response = new ResponseEntity<>(new InputStreamResource(inputStream),
	                    headers, HttpStatus.OK);
	            return response;
	        }

	        return ResponseEntity.ok("Data saved successfully! Inserted indices: " + insertedIndices + " Failed indices: "
	                + failedIndices);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
	    }
	}

	private String getInsertQueryT(String tableName, Map<String, Object> data,
	        List<Map<String, String>> transformations) {
	    StringBuilder sqlBuilder = new StringBuilder();
	    sqlBuilder.append("INSERT INTO ");
	    sqlBuilder.append(tableName);
	    sqlBuilder.append(" (");
	    List<String> transformedColumns = new ArrayList<>();
	    for (Map<String, String> transformation : transformations) {
	        String column = transformation.get("column");
	        transformedColumns.add(column);
	    }
	    sqlBuilder.append(String.join(", ", transformedColumns));
		sqlBuilder.append(") VALUES (");
		sqlBuilder.append(String.join(", ", Collections.nCopies(transformedColumns.size(), "?")));
		sqlBuilder.append(")");
		return sqlBuilder.toString();
	}

	private void createTableIfNotExistsT(String tableName, List<Map<String, String>> transformations) {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append("CREATE TABLE IF NOT EXISTS ");
		sqlBuilder.append(tableName);
		sqlBuilder.append(" (");

		// Check if "id" field exists in the transformations list
		boolean hasIdColumn = transformations.stream().anyMatch(t -> t.get("column").equalsIgnoreCase("id"));
		if (hasIdColumn) {
			// Add "id" column as the first column
			sqlBuilder.append("id INT PRIMARY KEY, ");
		}

		for (Map<String, String> transformation : transformations) {
			String columnName = transformation.get("column");
			String dataType = transformation.get("datatype");

			// Skip adding "id" field again
			if (columnName.equalsIgnoreCase("id")) {
				continue;
			}

			sqlBuilder.append(columnName).append(" ").append(getDataTypeSql(dataType)).append(", ");
		}

		sqlBuilder.delete(sqlBuilder.length() - 2, sqlBuilder.length()); // Remove the last comma and space
		sqlBuilder.append(")");

		jdbcTemplate.execute(sqlBuilder.toString());
	}

	private Object[] transformRow(Map<String, Object> row, List<Map<String, String>> transformations) {
		Object[] transformedValues = new Object[transformations.size()];
		for (int i = 0; i < transformations.size(); i++) {
			Map<String, String> transformation = transformations.get(i);
			String columnName = transformation.get("column");
			Object value = row.get(columnName);
			transformedValues[i] = value;
		}
		return transformedValues;
	}

	private String getDataTypeSql(String dataType) {
		switch (dataType.toLowerCase()) {
		case "int":
			return "INT";
		case "varchar":
			return "VARCHAR(255)";
		case "date":
			return "DATE";
		default:
			return "VARCHAR(255)";
		}
	}

//*********************************************************************************************************************************************************************//	
	              //FILTER AND TRANSFORM FOR BOTH API START//
	
//	@PostMapping("/transformAndFilter/{id}/{tableName}")
//	public ResponseEntity<?> transformAndFilterData(@PathVariable Long id,
//	        @PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data)
//	        throws JsonMappingException, JsonProcessingException {
//
//	    List<Integer> insertedIndices = new ArrayList<>();
//	    List<Integer> failedIndices = new ArrayList<>();
//	    List<Map<String, Object>> failedData = new ArrayList<>();
//
//	   // SureDataFlow_lines lines = flowrepo.getSureDataflowlines(id);
//	   // String transformJson = lines.getModel();
// 
//	    String transformJson = "[{\"column\":\"address\",\"datatype\":\"varchar\"},{\"column\":\"city\",\"datatype\":\"varchar\"}]";
//
//	    String filtersJson = "[{\"andor\":\"AND\",\"fields_name\":\"address\",\"condition\":\"=\",\"value\":\"barbil\"},{\"andor\":\"AND\",\"fields_name\":\"city\",\"condition\":\"=\",\"value\":\"sad\"}]";
//
//	    try {
//	        // Parse the transform JSON string into a list of transform maps
//	        List<Map<String, String>> transformations = new ObjectMapper().readValue(transformJson,
//	                new TypeReference<List<Map<String, String>>>() {
//	                });
//
//	        // Parse the filters JSON string into a list of filter maps
//	        List<Map<String, String>> filters = new ObjectMapper().readValue(filtersJson,
//	                new TypeReference<List<Map<String, String>>>() {
//	                });
//
//	        Map<String, Object> firstRow = data.get(0);
//	        createTableIfNotExistsB(tableName, firstRow, transformations);
//
//	        String sql = getInsertQueryB(tableName, firstRow, transformations);
//	        for (int i = 0; i < data.size(); i++) {
//	            Map<String, Object> row = data.get(i);
//	            Object[] values = transformRowB(row, transformations);
//	            try {
//	                // Apply the filters to the insert query
//	                if (applyFiltersB(filters, row)) {
//	                    jdbcTemplate.update(sql, values);
//	                    insertedIndices.add(i);
//	                }
//	            } catch (DataIntegrityViolationException e) {
//	                failedIndices.add(i);
//	                failedData.add(row);
//	            }
//	        }
//
//	        if (!failedData.isEmpty()) {
//	            Workbook workbook = new XSSFWorkbook();
//	            Sheet sheet = workbook.createSheet("Failed Records");
//
//	            // Add column headers to the worksheet
//	            Row headerRow = sheet.createRow(0);
//	            int columnIndex = 0;
//	            for (String key : failedData.get(0).keySet()) {
//	                Cell cell = headerRow.createCell(columnIndex++);
//	                cell.setCellValue(key);
//	            }
//
//	            // Add data rows to the worksheet
//	            int rowIndex = 1;
//	            for (Map<String, Object> row : failedData) {
//	                Row dataRow = sheet.createRow(rowIndex++);
//	                columnIndex = 0;
//	                for (Object value : row.values()) {
//	                    Cell cell = dataRow.createCell(columnIndex++);
//	                    cell.setCellValue(value != null ? value.toString() : "");
//	                }
//	            }
//
//	            // Write the workbook to a file
//	            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//	            workbook.write(outputStream);
//	            ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());
//
//	            HttpHeaders headers = new HttpHeaders();
//	            headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
//	            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=failed_records.xlsx");
//	            ResponseEntity<InputStreamResource> response = new ResponseEntity<>(new InputStreamResource(inputStream),
//	                    headers, HttpStatus.OK);
//	            return response;
//	        }
//
//	        return ResponseEntity.ok("Data saved successfully! Inserted indices: " + insertedIndices + " Failed indices: "
//	                + failedIndices);
//	    } catch (Exception e) {
//	        return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
//	    }
//	}
//
//	private String getInsertQueryB(String tableName, Map<String, Object> data, List<Map<String, String>> transformations) {
//	    StringBuilder sqlBuilder = new StringBuilder();
//	    sqlBuilder.append("INSERT INTO ").append(tableName).append(" (");
//
//	    int columnIndex = 0;
//	    for (String columnName : data.keySet()) {
//	        if (columnIndex > 0) {
//	            sqlBuilder.append(", ");
//	        }
//	        sqlBuilder.append(columnName);
//	        columnIndex++;
//	    }
//
//	    sqlBuilder.append(") VALUES (");
//
//	    columnIndex = 0;
//	    for (Map<String, String> transformation : transformations) {
//	        String columnName = transformation.get("column");
//	        if (columnIndex > 0) {
//	            sqlBuilder.append(", ");
//	        }
//	        sqlBuilder.append(":").append(columnName);
//	        columnIndex++;
//	    }
//
//	    sqlBuilder.append(")");
//
//	    return sqlBuilder.toString();
//	}
//
//	private Object[] transformRowB(Map<String, Object> row, List<Map<String, String>> transformations) {
//	    Object[] values = new Object[transformations.size()];
//	    for (int i = 0; i < transformations.size(); i++) {
//	        Map<String, String> transformation = transformations.get(i);
//	        String columnName = transformation.get("column");
//	        String transformationType = transformation.get("type");
//	        Object value = row.get(columnName);
//
//	        // Apply transformation based on the type
//	        if ("uppercase".equalsIgnoreCase(transformationType)) {
//	            values[i] = value != null ? value.toString().toUpperCase() : null;
//	        } else if ("lowercase".equalsIgnoreCase(transformationType)) {
//	            values[i] = value != null ? value.toString().toLowerCase() : null;
//	        } else {
//	            values[i] = value;
//	        }
//	    }
//	    return values;
//	}
//
//	private boolean applyFiltersB(List<Map<String, String>> filters, Map<String, Object> row) {
//	    for (Map<String, String> filter : filters) {
//	        String fieldName = filter.get("fieldName");
//	        String condition = filter.get("condition");
//	        String value = filter.get("value");
//	        Object rowValue = row.get(fieldName);
//
//	       
//	        if ("=".equals(condition)) {
//	            if (rowValue == null || !rowValue.toString().equals(value)) {
//	                return false;
//	            }
//	        } else if ("!=".equals(condition)) {
//	            if (rowValue == null || rowValue.toString().equals(value)) {
//	                return false;
//	            }
//	        } // Add other conditions 
//	    }
//	    return true;
//	}
//
//	private void createTableIfNotExistsB(String tableName, Map<String, Object> data,
//	        List<Map<String, String>> transformations) {
//		StringBuilder sqlBuilder = new StringBuilder();
//		sqlBuilder.append("CREATE TABLE IF NOT EXISTS ");
//		sqlBuilder.append(tableName);
//		sqlBuilder.append(" (");
//
//		// Check if "id" field exists in the transformations list
//		boolean hasIdColumn = transformations.stream().anyMatch(t -> t.get("column").equalsIgnoreCase("id"));
//		if (hasIdColumn) {
//			// Add "id" column as the first column
//			sqlBuilder.append("id INT PRIMARY KEY, ");
//		}
//
//		for (Map<String, String> transformation : transformations) {
//			String columnName = transformation.get("column");
//			String dataType = transformation.get("datatype");
//
//			// Skip adding "id" field again
//			if (columnName.equalsIgnoreCase("id")) {
//				continue;
//			}
//
//			sqlBuilder.append(columnName).append(" ").append(getDataTypeSql(dataType)).append(", ");
//		}
//
//		sqlBuilder.delete(sqlBuilder.length() - 2, sqlBuilder.length()); // Remove the last comma and space
//		sqlBuilder.append(")");
//
//		jdbcTemplate.execute(sqlBuilder.toString());
//	}

	
	
	
	//mapper with transform
	
	@PostMapping("/saveAndDownloadDataTransform1/{id}/{tableName}")
	public ResponseEntity<?> saveAndDownloadDataTransform1(@PathVariable Long id,
	        @PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data)
	        throws JsonMappingException, JsonProcessingException {

	    List<Integer> insertedIndices = new ArrayList<>();
	    List<Integer> failedIndices = new ArrayList<>();
	    List<Map<String, Object>> failedData = new ArrayList<>();


        String transformJson = "[{\"fieldname\":\"eid\",\"checkboxval\":\"\",\"sample_format\":\"json\",\"mapped_fields\":\"id\",\"dest_format\":\"\"},{\"fieldname\":\"ename\",\"checkboxval\":\"\",\"sample_format\":\"\",\"mapped_fields\":\"name\",\"dest_format\":\"\"},{\"fieldname\":\"city\",\"checkboxval\":\"\",\"sample_format\":\"\",\"mapped_fields\":\"town\",\"dest_format\":\"\"}]";

	    try {
	        // Call the changeKeysOfJson API to map the field names in the data
	        ResponseEntity<List<Map<String, String>>> mappingResponse = changeKeysOfJson(transformJson, data);
	        if (mappingResponse.getStatusCode() != HttpStatus.OK) {
	            // Error occurred in field mapping API
	            return ResponseEntity.badRequest().body("Error occurred while mapping field names");
	        }

	        List<Map<String, String>> fieldMapping = mappingResponse.getBody();

	        Map<String, Object> firstRow = data.get(0);
	        createTableIfNotExistsT(tableName, fieldMapping);

	        String sql = getInsertQueryT(tableName, firstRow, fieldMapping);
	        for (int i = 0; i < data.size(); i++) {
	            Map<String, Object> row = data.get(i);
	            Object[] values = transformRow(row, fieldMapping);
	            try {
	                jdbcTemplate.update(sql, values);
	                insertedIndices.add(i);
	            } catch (DataIntegrityViolationException e) {
	                failedIndices.add(i);
	                failedData.add(row);
	            }
	        }

	        if (!failedData.isEmpty()) {
	            Workbook workbook = new XSSFWorkbook();
	            Sheet sheet = workbook.createSheet("Failed Records");

	            // Add column headers to the worksheet
	            Row headerRow = sheet.createRow(0);
	            int columnIndex = 0;
	            for (String key : failedData.get(0).keySet()) {
	                Cell cell = headerRow.createCell(columnIndex++);
	                cell.setCellValue(key);
	            }

	            // Add data rows to the worksheet
	            int rowIndex = 1;
	            for (Map<String, Object> row : failedData) {
	                Row dataRow = sheet.createRow(rowIndex++);
	                columnIndex = 0;
	                for (Object value : row.values()) {
	                    Cell cell = dataRow.createCell(columnIndex++);
	                    cell.setCellValue(value != null ? value.toString() : "");
	                }
	            }

	            // Write the workbook to a file
	            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	            workbook.write(outputStream);
	            ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

	            HttpHeaders headers = new HttpHeaders();
	            headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
	            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=failed_records.xlsx");
	            ResponseEntity<InputStreamResource> response = new ResponseEntity<>(new InputStreamResource(inputStream),
	                    headers, HttpStatus.OK);
	            return response;
	        }

	        return ResponseEntity.ok("Data saved successfully! Inserted indices: " + insertedIndices + " Failed indices: "
	                + failedIndices);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
	    }
	}

	
	private ResponseEntity<List<Map<String, String>>> changeKeysOfJson(String transformJson, List<Map<String, Object>> data) throws JsonProcessingException {
	    // Create the request URL and parameters
	    String url = "http://localhost:9191/api/excel/jsonkeychange";
	    String newjson = transformJson;
	    String body = new ObjectMapper().writeValueAsString(data);

	    // Create the request entity with the required headers
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

	    // Create the request parameters
	    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	    params.add("newjson", newjson);
	    params.add("body", body);

	    // Create the HTTP entity with headers and parameters
	    HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

	    RestTemplate restTemplate = new RestTemplate();
	    // Send the POST request to the changeKeysOfJson API
	    ResponseEntity<List<Map<String, String>>> response = restTemplate.exchange(
	            url,
	            HttpMethod.POST,
	            requestEntity,
	            new ParameterizedTypeReference<List<Map<String, String>>>() {
	            }
	    );

	    return response;
	}

}
