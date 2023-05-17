package com.realnet.suredata.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.realnet.webhook.entity.Outgoing_lines;

import lombok.Data;

@Data
@Entity
@Table(name = "SureDataFlow")
public class DataflowModel {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private long id;
	private String pipeline_name;
	private String snapshot_type;
	private String description;
	private boolean active;
	private String select_data_source;
	private String select_data_store;
	private int port_number;
	private boolean auto_table_mapping;
	private String table_prefix;
	private boolean nested_field_as_json;
	private String cron;
	private int every;
    private String refreshtype;
    
	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "dataflowModel")
	private List<SureDataFlow_lines> dataflow_lines = new ArrayList<>();
}

