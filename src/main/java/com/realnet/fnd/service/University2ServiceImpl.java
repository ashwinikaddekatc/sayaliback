package com.realnet.fnd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.realnet.comm.entity.University2Entity;
import com.realnet.exceptions.ResourceNotFoundException;
import com.realnet.fnd.repository.University2Repository;

@Service
public class University2ServiceImpl implements University2Service{

	@Autowired
	private University2Repository authrepo;
	
	@Override
	public Page<University2Entity> getAll(Pageable page) {
		// TODO Auto-generated method stub
		return authrepo.findAll(page);
	}

	@Override
	public University2Entity getById(int id) {
		// TODO Auto-generated method stub
		University2Entity teacher= authrepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Teacher not found :: " + id));
		return teacher;
	}

	@Override
	public University2Entity save(University2Entity teacher) {
		// TODO Auto-generated method stub
		University2Entity savedTeacher = authrepo.save(teacher);
		return savedTeacher;
	}

	@Override
	public University2Entity updateById(int id, University2Entity teacherRequest) {
		// TODO Auto-generated method stub
				University2Entity old_teacher = authrepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Teacher not found :: " + id));
				old_teacher.setName(teacherRequest.getName());
				old_teacher.setEmail(teacherRequest.getEmail());
				old_teacher.setSubject(teacherRequest.getSubject());
				old_teacher.setPhone(teacherRequest.getPhone());
				old_teacher.setBook(teacherRequest.getBook());
		
		
		final University2Entity updated_teacher = authrepo.save(old_teacher);

		return updated_teacher;
	}

	@Override
	public boolean deleteById(int id) {
		// TODO Auto-generated method stub
		if (!authrepo.existsById(id)) {
			throw new ResourceNotFoundException("author not found :: " + id);
		}
		
		University2Entity teacher = authrepo.findById(id).orElse(null);
		authrepo.delete(teacher);
		return true;
	}

}
