package com.realnet.suredata.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.realnet.Dashboard1.Entity.dashbord_Who_collumn;

import lombok.Data;
@Data
@Entity
public class ErrorTable extends dashbord_Who_collumn{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String response;
	private boolean emailsent;
	private boolean stopdataflow;
}
