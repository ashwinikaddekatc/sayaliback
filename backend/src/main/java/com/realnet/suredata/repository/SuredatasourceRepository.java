package com.realnet.suredata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.realnet.suredata.entity.SureDatasourceEntity;
@Repository
public interface SuredatasourceRepository extends JpaRepository<SureDatasourceEntity, Long> {

	
	@Query(value = "SELECT * FROM sure_datasource_entity where data_source_name=?1", nativeQuery = true)
	SureDatasourceEntity findByName(String data_source_name);

}
