package com.realnet.fnd.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.realnet.comm.entity.PlayEntity2;

@Repository
public interface PlayRepository2  extends JpaRepository<PlayEntity2, Integer>{

	Page<PlayEntity2> findAll(Pageable p);
	
	@Query("Select s from PlayEntity2 s Where s.wf_instance_id= :id" )
	PlayEntity2 findBywf_instance_id(@Param("id") int id);
}
