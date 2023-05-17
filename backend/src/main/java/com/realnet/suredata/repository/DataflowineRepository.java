package com.realnet.suredata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.realnet.suredata.entity.SureDataFlow_lines;

public interface DataflowineRepository extends JpaRepository<SureDataFlow_lines, Long>{
	
	@Query(value = "SELECT * FROM sure_data_flow_lines where dataflow_model_id =?1", nativeQuery = true)
	SureDataFlow_lines getSureDataflowlines(Long id);
	


}
