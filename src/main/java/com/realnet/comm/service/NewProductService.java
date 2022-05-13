package com.realnet.comm.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.realnet.comm.entity.NewProductEntity;

public interface NewProductService 
{
   public Page<NewProductEntity> getList(Pageable page);
   public List<NewProductEntity> saveproduct(List<NewProductEntity> product);
   public NewProductEntity getid(int id);
   public NewProductEntity updateById(int id, NewProductEntity productEntity);
   public boolean deleteById(int id);
}
