package com.realnet.fnd.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.realnet.comm.entity.University2Entity;

public interface University2Service
{
	public Page<University2Entity> getAll(Pageable page);
	public University2Entity getById(int id);
	public University2Entity save(University2Entity teacher);
	public University2Entity updateById(int id, University2Entity teacherRequest);
	public boolean deleteById(int id);
}

