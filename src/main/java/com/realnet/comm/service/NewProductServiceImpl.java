package com.realnet.comm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.realnet.comm.entity.NewProductEntity;
import com.realnet.comm.repository.NewProductRepository;
import com.realnet.exceptions.ResourceNotFoundException;

@Service
public class NewProductServiceImpl implements NewProductService
{
    @Autowired
    private NewProductRepository newProductRepository;
	
	@Override
	public Page<NewProductEntity> getList(Pageable page) {
		// TODO Auto-generated method stub
		return newProductRepository.findAll(page);
	}

	@Override
	public List<NewProductEntity> saveproduct(List<NewProductEntity> product) {
		// TODO Auto-generated method stub
		List<NewProductEntity> saveAll=this.newProductRepository.saveAll(product);
		return saveAll;
	}
	

	@Override
	public NewProductEntity getid(int id) {
		// TODO Auto-generated method stub
		NewProductEntity orElseThrow =this.newProductRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("product not found :: " + id));
		return orElseThrow;
	}

	@Override
	public NewProductEntity updateById(int id, NewProductEntity newProductEntity) {
		// TODO Auto-generated method stub
		NewProductEntity product = newProductRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("product not found :: " + id));
			
		product.setProductname(newProductEntity.getProductname());
		
		
		product.setQuantity(newProductEntity.getQuantity());
		
		
		product.setDate(newProductEntity.getDate());
		
		
		product.setPhone(newProductEntity.getPhone());
		
		
		product.setPrice(newProductEntity.getPrice());
		
		newProductRepository.save(product);
		
		return product;
	}

	@Override
	public boolean deleteById(int id) {
		// TODO Auto-generated method stub
        if (!newProductRepository.existsById(id)) {
			
			throw new ResourceNotFoundException("Product  not found :: " + id);
		}
		
		NewProductEntity product = newProductRepository.findById(id).orElse(null);
		newProductRepository.delete(product);
		return true;
	}

}
