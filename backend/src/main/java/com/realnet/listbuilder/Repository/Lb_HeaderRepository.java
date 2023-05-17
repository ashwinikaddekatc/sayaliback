package com.realnet.listbuilder.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.realnet.Dashboard1.Entity.Dashbord_Header;
import com.realnet.listbuilder.Entity.Lb_Header;

@Repository
public interface Lb_HeaderRepository extends CrudRepository<Lb_Header, Integer> {

	Lb_Header findById(int id);

	@Query(value = " select * from lb_header where module_id=?1", nativeQuery = true)
	List<Lb_Header> findbylbdmodule(int module_id);

	@Query(value = "select count(id) from lb_header", nativeQuery = true)
	public List<Object> findCount();
	
	@Query(value = "SELECT count(id) FROM realnet_CNSBE.lb_header where module_id=?1", nativeQuery = true)
	String count_lbheader(Integer moduleId);

}
