package com.realnet.suredata.dataflowServices;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.realnet.suredata.entity.DataflowModel;
import com.realnet.suredata.repository.DataflowRepository;



@Service
public class DataflowServiceImpl implements DataflowService {

	@Autowired
	private DataflowRepository dataflowRepository;

	@Override
	public List<DataflowModel> getAllDataflows() {
		// TODO Auto-generated method stub
		return dataflowRepository.findAll();
	}

	@Override
	public DataflowModel saveDataflow(DataflowModel dataflowModel) {
		// TODO Auto-generated method stub
		DataflowModel save = this.dataflowRepository.save(dataflowModel);
		return save;
	}

	@Override
	public DataflowModel getDataflowById(long id) {
		// TODO Auto-generated method stub
		Optional<DataflowModel> optional = dataflowRepository.findById(id);
		DataflowModel dataflow = null;
		if (optional.isPresent()) {
			dataflow = optional.get();
		} else {
			throw new RuntimeException(" data not found for id :: " + id);
		}
		return dataflow;
	}

	@Override
	public void deleteDataflowById(long id) {
		// TODO Auto-generated method stub
		this.dataflowRepository.deleteById(id);
	}

	public DataflowModel updateDataflowModel(Long id, DataflowModel dataflow) {

		DataflowModel existingDataflowModel = dataflowRepository.findById(id).orElse(null);

		existingDataflowModel.setPipeline_name(dataflow.getPipeline_name());
		existingDataflowModel.setSnapshot_type(dataflow.getSnapshot_type());
		existingDataflowModel.setDescription(dataflow.getDescription());
		existingDataflowModel.setActive(false);
		existingDataflowModel.setSelect_data_source(dataflow.getSelect_data_source());
		existingDataflowModel.setSelect_data_store(dataflow.getSelect_data_store());
		existingDataflowModel.setPort_number(dataflow.getPort_number());
		existingDataflowModel.setAuto_table_mapping(false);

		existingDataflowModel.setTable_prefix(dataflow.getTable_prefix());
		existingDataflowModel.setNested_field_as_json(false);
		existingDataflowModel.setCron(dataflow.getCron());
		existingDataflowModel.setEvery(dataflow.getEvery());

		return dataflowRepository.save(existingDataflowModel);
	}

}
