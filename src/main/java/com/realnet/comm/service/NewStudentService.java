package com.realnet.comm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.realnet.comm.entity.NewStudentEntity;

public interface NewStudentService
{
   public Page<NewStudentEntity> getList(Pageable page);
   public NewStudentEntity createNewStudent(NewStudentEntity data); 
   public NewStudentEntity getid(int id);
   public NewStudentEntity updateById(int id, NewStudentEntity newStudentEntity);
   public boolean deleteById(int id);
}
