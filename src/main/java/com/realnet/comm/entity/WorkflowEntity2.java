package com.realnet.comm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="workflow1")
public class WorkflowEntity2 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private int wf_id;
	@Column(length = 1000)
	private String current_json;
	private String Status;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getWf_id() {
		return wf_id;
	}
	public void setWf_id(int wf_id) {
		this.wf_id = wf_id;
	}
	public String getCurrent_json() {
		return current_json;
	}
	public void setCurrent_json(String current_json) {
		this.current_json = current_json;
	}
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}
	@Override
	public String toString() {
		return "WorkflowEntity2 [id=" + id + ", wf_id=" + wf_id + ", current_json=" + current_json + ", Status="
				+ Status + "]";
	}
	
	
	
  
}
