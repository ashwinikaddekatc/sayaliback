package com.realnet.fnd.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.realnet.comm.entity.WorkflowEntity2;
import com.realnet.exceptions.ResourceNotFoundException;
import com.realnet.fnd.repository.WorkflowRepository2;

@Service
public class WorkflowServiceImpl2 implements WorkflowService2
{
   @Autowired
   private WorkflowRepository2 authrepo;
	
	@Override
	public Page<WorkflowEntity2> getAll(Pageable page) {
		// TODO Auto-generated method stub
		return authrepo.findAll(page);
	}

	@Override
	public WorkflowEntity2 getById(int id) {
		// TODO Auto-generated method stub
		WorkflowEntity2 student= authrepo.findById(id).
				orElseThrow(() -> new ResourceNotFoundException("student not found :: " + id));
		return student;
	}

	@Override
	public WorkflowEntity2 save(WorkflowEntity2 teacher) {
		// TODO Auto-generated method stub
		WorkflowEntity2 saved= authrepo.save(teacher);
		return saved;
	}

	@Override
	public WorkflowEntity2 updateById(int id, WorkflowEntity2 teacherRequest) {
		// TODO Auto-generated method stub
		Optional<WorkflowEntity2> findById = authrepo.findById(id);
		WorkflowEntity2 oldworkflowEntity2 = findById.get();
		oldworkflowEntity2.setCurrent_json(teacherRequest.getCurrent_json());
		oldworkflowEntity2.setStatus(teacherRequest.getStatus());
		oldworkflowEntity2.setWf_id(teacherRequest.getWf_id());
		
		WorkflowEntity2 save = authrepo.save(oldworkflowEntity2);
		return save;
	}

	@Override
	public boolean deleteById(int id) {
		// TODO Auto-generated method stub
		if(!authrepo.existsById(id))
	    {
			throw new ResourceNotFoundException("author not found :: " + id);
		}
		WorkflowEntity2 teacher=authrepo.findById(id).orElse(null);
		authrepo.delete(teacher);				
		return true;
	}

}
