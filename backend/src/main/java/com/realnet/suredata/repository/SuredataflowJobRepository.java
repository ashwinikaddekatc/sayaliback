package com.realnet.suredata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.realnet.suredata.entity.SureDataflowJobEntity;

@Repository
public interface SuredataflowJobRepository extends JpaRepository<SureDataflowJobEntity, Long> {
	
	@Query(value = "SELECT * FROM sure_data_flowjob where job_type=?1", nativeQuery = true)
	SureDataflowJobEntity getByJobType(String jobtype);

}
