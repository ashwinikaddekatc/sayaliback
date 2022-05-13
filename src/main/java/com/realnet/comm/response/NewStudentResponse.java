package com.realnet.comm.response;

import java.util.List;

import com.realnet.comm.entity.NewStudentEntity;
import com.realnet.fnd.response.PageResponse;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper=false)
@Getter
@Setter
public class NewStudentResponse extends PageResponse{
	
	@ApiModelProperty(required = true, value = "")
	private List<NewStudentEntity> NewStudentEntity;	 
	
}
