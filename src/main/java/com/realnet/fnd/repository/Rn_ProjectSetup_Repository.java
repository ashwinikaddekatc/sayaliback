package com.realnet.fnd.repository;





import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realnet.fnd.entity.Rn_Project_Setup;

@Repository
public interface Rn_ProjectSetup_Repository extends JpaRepository<Rn_Project_Setup, Integer> {
	// for pagination
	Page<Rn_Project_Setup> findAll(Pageable p);
//

	 List<Rn_Project_Setup> findByCreatedBy(Long created_by); 
	 
	//List<Rn_Project_Setup> findByUserId(int created_by);

	

//	@Query(value = "SELECT ID, PROJECT_NAME FROM RN_PROJECT_SETUP", nativeQuery = true)
//	List<Rn_Project_Setup> findProjectsForDropDown();
}
