package com.realnet.comm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.net.HttpHeaders;
import com.realnet.comm.entity.NewProductEntity;
import com.realnet.comm.response.NewProductResponse;
import com.realnet.comm.service.NewProductService;
import com.realnet.exceptions.ResourceNotFoundException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value="/api",produces=org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
@Api(tags = { "/ProductEntity" })

public class NewProductController
{
  @Autowired
  private NewProductService newProductService;
  

	    // get all data
	    @ApiOperation(value = "List of NewProduct", response = NewProductResponse.class)
	    @GetMapping(path = "/getnewproduct")
	    public NewProductResponse getdata(@RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
		@RequestParam(value = "size", defaultValue = "20", required = false) Integer size)
	    {
		NewProductResponse resp = new NewProductResponse();
		Pageable paging = PageRequest.of(page, size);
		Page<NewProductEntity> result =  newProductService.getList(paging);
		resp.setPageStats(result, true);
		resp.setNewproductEntity(result.getContent());
		return resp;
	    }
	    
	   // add data
	 	@ApiOperation(value = "add a  new product", response = NewProductEntity.class)
	 	@PostMapping(path = "/getnewproduct")
	 	public ResponseEntity<?> savedata(
	 	@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authToken, @Valid
	 	@RequestBody List<NewProductEntity> newProductEntity)
	 	{	 			
	 	System.out.println(newProductEntity);
	 	List<NewProductEntity> saveproduct = newProductService.saveproduct(newProductEntity);
	 	if (saveproduct == null) {
	 	throw new ResourceNotFoundException("product not saved");
	 	}
	 	return ResponseEntity.status(HttpStatus.CREATED).body(saveproduct);
	 	}
	 	
	    // get data by id
	 	@ApiOperation(value = "product", response = NewProductEntity.class)
	 	@GetMapping("/getnewproduct/{id}" )
	 	public ResponseEntity<NewProductEntity> getbyid(@PathVariable("id") Integer id) {
	 	NewProductEntity getid = newProductService.getid(id);
	 	if (getid == null) {
	 	throw new ResourceNotFoundException("id not found with id " + id);
	 	}
	 	return ResponseEntity.ok().body(getid);
	 	}
	 	
	 	// UPDATE
	 	@ApiOperation(value = "update a product", response = NewProductEntity.class)
	 	@PutMapping("/getnewproduct/{id}")
	 	public ResponseEntity<NewProductEntity> updateProduct(
	 			@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authToken,
	 			@PathVariable(value = "id") Integer id, @Valid @RequestBody NewProductEntity productEntity) 
	 	       {
	 			NewProductEntity updatedsale = newProductService.updateById(id, productEntity);
	 			if (updatedsale == null || id != updatedsale.getProductid())
	 			{
	 				throw new ResourceNotFoundException("product not found with id " + id);
	 			}
	 			return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedsale);
	 		  }
	 	
	    // DELETE
	 	@DeleteMapping("/getnewproduct/{id}")
	 	public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable(value = "id") Integer id) 
	 	{
	 			boolean delete = newProductService.deleteById(id);
	 			Map<String, Boolean> response = new HashMap<>();
	 			if (delete) {
	 				response.put("delete", Boolean.TRUE);
	 				return ResponseEntity.status(HttpStatus.OK).body(response);
	 			}
	 			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	 	}
	 		
}
