package com.realnet.formio.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "board")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Board {
	 
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long bId;
	private String bName;
	
	private String type;
	private int project_id;
	
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Column> columns;


}
