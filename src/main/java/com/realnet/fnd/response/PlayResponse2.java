package com.realnet.fnd.response;

import java.util.List;

import com.realnet.comm.entity.PlayEntity2;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class PlayResponse2  extends PageResponse{
	
	@ApiModelProperty(required = true , value = "")
	private List<PlayEntity2> StudentEntity;

}
