package com.realnet.fnd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.realnet.comm.entity.PlayEntity2;
import com.realnet.exceptions.ResourceNotFoundException;
import com.realnet.fnd.repository.PlayRepository2;

@Service
public class PlayServiceImpl2 implements PlayService2
{
	@Autowired
	private PlayRepository2 collegeStudentRepository;

	@Override
	public Page<PlayEntity2> getlist(Pageable page) {
		// TODO Auto-generated method stub
		return collegeStudentRepository.findAll(page);
	}

	@Override
	public PlayEntity2 createCollageStudent(PlayEntity2 data) {
		// TODO Auto-generated method stub
		return collegeStudentRepository.save(data);
	}

	@Override
	public PlayEntity2 getid(int id) {
		// TODO Auto-generated method stub
		PlayEntity2 student=this.collegeStudentRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Rn_Instructor not found :: " + id));
		return student;
	}

	@Override
	public PlayEntity2 updateById(int id, PlayEntity2 collegePortalEntity) {
		// TODO Auto-generated method stub
		PlayEntity2 student = collegeStudentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("student not found :: " + id));
			
		student.setStudentname(collegePortalEntity.getStudentname());
		
		student.setWf_instance_id(collegePortalEntity.getWf_instance_id());
		
		student.setDepartment(collegePortalEntity.getDepartment());
		
		
		student.setJoiningDate(collegePortalEntity.getJoiningDate());
		
		
		student.setPhone(collegePortalEntity.getPhone());
		
		
		student.setEmailId(collegePortalEntity.getEmailId());
		
		collegeStudentRepository.save(student);
		return student;
	}

	@Override
	public boolean deleteById(int id) {
		// TODO Auto-generated method stub
		if(!collegeStudentRepository.existsById(id))
		{
			throw new ResourceNotFoundException("CollegeStudent  not found :: " + id);
		}
		PlayEntity2 student=collegeStudentRepository.findById(id).orElse(null);
	    collegeStudentRepository.delete(student);
		return true;
	}

	@Override
	public PlayEntity2 getwf_instance_id(int id) {
		// TODO Auto-generated method stub
		PlayEntity2 findBywf_instance_id=collegeStudentRepository.findBywf_instance_id(id);
		return findBywf_instance_id ;
	}

	@Override
	public PlayEntity2 updateBywf_instance_id(int id, PlayEntity2 collegePortalEntity) {
		// TODO Auto-generated method stub
		PlayEntity2 student=collegeStudentRepository.findBywf_instance_id(id);
		
		student.setStudentname(collegePortalEntity.getStudentname());
        student.setDepartment(collegePortalEntity.getDepartment());		
		student.setJoiningDate(collegePortalEntity.getJoiningDate());		
		student.setPhone(collegePortalEntity.getPhone());
		student.setEmailId(collegePortalEntity.getEmailId());
		
		collegeStudentRepository.save(student);
		return student;
	}

	
}
