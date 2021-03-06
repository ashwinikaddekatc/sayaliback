package com.realnet.comm.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
@Table(name="Teacher2")
public class University2Entity
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
    private String name;
    private String email;
    private String subject;
    private Long phone;
	
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Book2Entity> book;
}
