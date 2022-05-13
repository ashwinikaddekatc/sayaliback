package com.realnet.comm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.realnet.comm.entity.NewStudentEntity;
import com.realnet.comm.repository.NewStudentRepository;
import com.realnet.exceptions.ResourceNotFoundException;

@Service
public class NewStudentServiceImpl implements NewStudentService 
{
	@Autowired
    private NewStudentRepository newStudentRepository;
	
	@Override
	public Page<NewStudentEntity> getList(Pageable page) {
		// TODO Auto-generated method stub
		return newStudentRepository.findAll(page);
	}

	@Override
	public NewStudentEntity createNewStudent(NewStudentEntity data) {
		// TODO Auto-generated method stub
		return newStudentRepository.save(data);
	}

	@Override
	public NewStudentEntity getid(int id) {
		// TODO Auto-generated method stub
		NewStudentEntity orElseThrow = this.newStudentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Rn_Instructor not found :: " + id));
		return orElseThrow;
	}

	@Override
	public NewStudentEntity updateById(int id, NewStudentEntity newStudentEntity) {
		// TODO Auto-generated method stub
		NewStudentEntity student = newStudentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("student not found :: " + id));
			
		student.setStudentname(newStudentEntity.getStudentname());
		
		
		student.setDepartment(newStudentEntity.getDepartment());
		
		
		student.setJoiningDate(newStudentEntity.getJoiningDate());
		
		
		student.setPhone(newStudentEntity.getPhone());
		
		
		student.setEmailId(newStudentEntity.getEmailId());
		
		newStudentRepository.save(student);
		
		return student;
	}

	@Override
	public boolean deleteById(int id) {
		// TODO Auto-generated method stub
if (!newStudentRepository.existsById(id)) {
			
			throw new ResourceNotFoundException("newStudent  not found :: " + id);
		}
		
        NewStudentEntity student = newStudentRepository.findById(id).orElse(null);
        newStudentRepository.delete(student);
		return true;
	}

}
