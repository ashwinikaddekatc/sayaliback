package com.realnet.suredata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realnet.suredata.entity.Success_table;
@Repository
public interface SuccessTableRepo extends JpaRepository<Success_table, Long> {

}
