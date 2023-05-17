package com.realnet.suredata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realnet.suredata.dataflowServices.DataflowServiceImpl;
import com.realnet.suredata.dataflowServices.SureDataJobService;
import com.realnet.suredata.entity.DataflowModel;


@RestController
@RequestMapping("/dataflow")
public class DataflowController {

	@Autowired
	DataflowServiceImpl dataflowServiceImpl;


	@GetMapping("/dataflow")
	private List<DataflowModel> getAllDataflows() {
		return dataflowServiceImpl.getAllDataflows();
	}

	@PostMapping("/dataflow")
	private DataflowModel saveDataflow(@RequestBody DataflowModel dataflowModel) {

		DataflowModel saveEmployee = dataflowServiceImpl.saveDataflow(dataflowModel);

		return saveEmployee;
	}

	// get specific dataflow
	@GetMapping("/dataflow/{id}")
	private DataflowModel getBooks(@PathVariable("id") long id) {

		return dataflowServiceImpl.getDataflowById(id);
	}

	// delete
	@DeleteMapping("/dataflow/{id}")
	private void deleteBook(@PathVariable("id") long id) {

		dataflowServiceImpl.deleteDataflowById(id);
	}

	@PutMapping("/dataflow/{id}")
	public DataflowModel updaDataflow(@PathVariable long id, @RequestBody DataflowModel dataflowModel) {
		return dataflowServiceImpl.updateDataflowModel(id, dataflowModel);
	}
}
