package com.realnet.suredata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.realnet.suredata.entity.SureDataEntity;


@Repository
public interface SureDataRepository extends JpaRepository<SureDataEntity, Long> {
	
	@Query(value = "SELECT * FROM sure_data_entity where data_store_name=?1", nativeQuery = true)
	SureDataEntity findByName(String data_store);
}
