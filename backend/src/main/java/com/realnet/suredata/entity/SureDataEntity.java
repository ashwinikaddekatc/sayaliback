package com.realnet.suredata.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class SureDataEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String data_store_name;
	private String data_store_type;
	@Column(name = "description",nullable = true)
	private String description;
	private Boolean active;
	private String database_name;
	private String db_host_name;
	private String portnumber;
	private String user_name;
	private String password;
	private Boolean connectssh;
	private String ssh_host_name;
	private String ssh_file_key;
	private String ssh_user_name;
	private String ssh_password;

	

}
