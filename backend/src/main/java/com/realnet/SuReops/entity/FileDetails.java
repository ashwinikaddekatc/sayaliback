package com.realnet.SuReops.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class FileDetails implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String text;
}
