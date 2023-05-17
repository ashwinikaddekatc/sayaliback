package com.realnet.suredata.controller;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@RestController
@RequestMapping("api/excel")
public class ExcelConnector {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;


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


	@GetMapping("/jsonkeychange")
	public ResponseEntity<?> changeKeysOfJson(@RequestParam String newjson, @RequestParam String body)
			throws IOException {

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(newjson);
		JsonElement element2 = parser.parse(body);
		JsonObject object2 = element.getAsJsonObject();
		JsonArray array = element2.getAsJsonArray();
		Iterator iterator = array.iterator();

		List<Map> jsonList = new ArrayList<Map>();

		Set<String> keySet = object2.keySet();
		Iterator<String> it = keySet.iterator();

//		String key = it.next();
		while (iterator.hasNext()) {

			Map<String, String> map = new HashMap<String, String>();
			Object next = iterator.next();
			JsonElement parse = parser.parse(next.toString());
			JsonObject jsonObject = parse.getAsJsonObject();
			for (String k : keySet) {
				String next2 = object2.get(k).getAsString();
				String value2 = jsonObject.get(k).getAsString();
				map.put(next2, value2);
			}

			jsonList.add(map);

		}

		return new ResponseEntity<>(jsonList, HttpStatus.BAD_REQUEST);
	}
	
	
//	@PostMapping("/save-data/{tableName}")
//    public ResponseEntity<String> saveData(@PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data) {
//        try {
//            String sql = getInsertQuery(tableName, data.get(0));
//            for (Map<String, Object> row : data) {
//                Object[] values = row.values().toArray();
//                jdbcTemplate.update(sql, values);
//            }
//            return ResponseEntity.ok("Data saved successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
//        }
//    }
//
//    private String getInsertQuery(String tableName, Map<String, Object> data) {
//        StringBuilder sqlBuilder = new StringBuilder();
//        sqlBuilder.append("INSERT INTO ");
//        sqlBuilder.append(tableName);
//        sqlBuilder.append(" (");
//        sqlBuilder.append(String.join(", ", data.keySet()));
//        sqlBuilder.append(") VALUES (");
//        sqlBuilder.append(String.join(", ", Collections.nCopies(data.size(), "?")));
//        sqlBuilder.append(")");
//        return sqlBuilder.toString();
//    }
	
	
	
	@PostMapping("/save-data/{tableName}")
	public ResponseEntity<String> saveData(@PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data) {
	    List<Integer> insertedIndices = new ArrayList<>();
	    List<Integer> failedIndices = new ArrayList<>();

	    
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
	            }
	            
	        }
	        return ResponseEntity.ok("Data saved successfully! Inserted indices: " + insertedIndices + " Failed indices: " + failedIndices);
	    }
	    catch (Exception e) {
	        return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
	    }
	  
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
	
	//saving the correct data and download the excel of incorrect data
	@PostMapping("/savedataDownloadExcel/{tableName}")
	public ResponseEntity<?> saveDataAndDownloadIncorrectData(@PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data) {
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
	            ResponseEntity<InputStreamResource> response = new ResponseEntity<>(new InputStreamResource(inputStream), headers, HttpStatus.OK);
                return response;
	        }

	        return ResponseEntity.ok("Data saved successfully! Inserted indices: " + insertedIndices + " Failed indices: " + failedIndices);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Error occurred while saving data: " + e.getMessage());
	    }
	}


	
	
	
	//save data anreturn failed data with eror and exception field
	@PostMapping("/DownloadExcelErEx/{tableName}")
	public ResponseEntity<InputStreamResource> DownloadIncorrectDatawithErExField(@PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data) {
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
	
	
	
	
	//DOWNLOAD EXCEL FILE WITH ALL THE DATA
	@PostMapping("/DownloadExcelWithErANDEx/{tableName}")
	public ResponseEntity<InputStreamResource> DownloadAllTheData(@PathVariable("tableName") String tableName, @RequestBody List<Map<String, Object>> data) {
	    List<Map<String, Object>> processedData = new ArrayList<>();

	    try {
	        String sql = getInsertQuery(tableName, data.get(0));
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
	            Sheet sheet = workbook.createSheet("Data Records");

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
	            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=data_records.xlsx");
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


	
	
}
