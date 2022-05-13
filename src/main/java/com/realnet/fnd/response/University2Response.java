package com.realnet.fnd.response;

import java.util.List;

import com.realnet.comm.entity.University2Entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class University2Response extends PageResponse {
	 
	@ApiModelProperty(required = true, value="")
	private List<University2Entity> author;

}
