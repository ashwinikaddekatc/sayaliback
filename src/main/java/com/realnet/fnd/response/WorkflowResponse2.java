package com.realnet.fnd.response;

import java.util.List;

import com.realnet.comm.entity.WorkflowEntity2;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class WorkflowResponse2 extends PageResponse {

	@ApiModelProperty(required = true,value = "")
	private List<WorkflowEntity2> author;
}
