package com.realnet.suredata.dataflowServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.realnet.suredata.entity.SureDataflowJobEntity;
import com.realnet.suredata.repository.SuredataflowJobRepository;

@Service
public class SureDataJobService {

	@Autowired
	private SuredataflowJobRepository jobrepo;
	
	public SureDataflowJobEntity getJobtype(String jobtype) {
		SureDataflowJobEntity byJobType = jobrepo.getByJobType(jobtype);
		return byJobType;
	}
}
