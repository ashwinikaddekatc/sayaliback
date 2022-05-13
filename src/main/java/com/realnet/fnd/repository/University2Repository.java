package com.realnet.fnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realnet.comm.entity.University2Entity;

@Repository
public interface University2Repository extends JpaRepository<University2Entity, Integer> {
	

}
