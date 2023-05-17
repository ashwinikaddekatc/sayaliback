package com.realnet.suredata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realnet.suredata.entity.DataflowModel;


@Repository
public interface DataflowRepository extends JpaRepository<DataflowModel, Long> {

}
