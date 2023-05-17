package com.realnet.suredata.entity;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "SureDataFlowjob")
public class SureDataflowJobEntity {

	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private long id;
	private String parameters;
	private String url;
	private String method;
	private String connection_name;
	private String job_type;
	private String ref;
	
	
}
