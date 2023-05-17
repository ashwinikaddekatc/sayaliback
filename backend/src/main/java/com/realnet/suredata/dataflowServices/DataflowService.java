package com.realnet.suredata.dataflowServices;

import java.util.List;

import com.realnet.suredata.entity.DataflowModel;



public interface DataflowService {
     
    List<DataflowModel> getAllDataflows();
	
    DataflowModel saveDataflow(DataflowModel dataflowModel);
	
	DataflowModel getDataflowById(long id);
	
	void deleteDataflowById(long id);
	
}
