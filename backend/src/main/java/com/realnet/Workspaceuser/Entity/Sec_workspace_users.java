package com.realnet.Workspaceuser.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.realnet.Dashboard1.Entity.dashbord_Who_collumn;

import lombok.Data;

@Entity
@Data
public class Sec_workspace_users extends  dashbord_Who_collumn{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int worksapce_id;
	private Long user_id; 
	private String user_name;
	private Integer project_id; 
	private String user_role;

}
