package com.realnet.comm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realnet.comm.entity.NewProductEntity;

@Repository
public interface NewProductRepository extends JpaRepository<NewProductEntity, Integer>
{
  Page<NewProductEntity> findAll(Pageable p);
}
