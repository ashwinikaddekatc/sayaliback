package com.realnet.comm.response;

import java.util.List;

import com.realnet.comm.entity.NewProductEntity;
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
public class NewProductResponse extends PageResponse
{
   @ApiModelProperty(required=true,value="")
   private List<NewProductEntity> newproductEntity;
}
