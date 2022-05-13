package com.realnet.fnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realnet.comm.entity.WorkflowEntity2;

@Repository
public interface WorkflowRepository2  extends JpaRepository<WorkflowEntity2, Integer>{

}
