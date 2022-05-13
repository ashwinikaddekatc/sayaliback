package com.realnet.fnd.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.realnet.comm.entity.WorkflowEntity2;

public interface WorkflowService2
{	
	public Page<WorkflowEntity2> getAll(Pageable page);
	public WorkflowEntity2 getById(int id);
	public WorkflowEntity2 save(WorkflowEntity2 teacher);
	public WorkflowEntity2 updateById(int id, WorkflowEntity2 teacherRequest);
	public boolean deleteById(int id);
	
}
