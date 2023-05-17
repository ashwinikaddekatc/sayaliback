package com.realnet.suredata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realnet.suredata.entity.ErrorTable;
@Repository
public interface ErrorTableRepo extends JpaRepository<ErrorTable, Long> {

}
