package com.realnet.comm.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class WorkEntity2
{	
    @Id	
	private  Integer wf_id;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JsonBackReference
	private WorkflowEntity2 studententity;

	public Integer getWf_id() {
		return wf_id;
	}

	public void setWf_id(Integer wf_id) {
		this.wf_id = wf_id;
	}

	public WorkflowEntity2 getStudententity() {
		return studententity;
	}

	public void setStudententity(WorkflowEntity2 studententity) {
		this.studententity = studententity;
	}
    
    
}
