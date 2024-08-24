package com.zosh.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.exception.ProductException;
import com.zosh.exception.UserException;
import com.zosh.modal.Product;
import com.zosh.modal.User;
import com.zosh.request.CreateProductRequest;
import com.zosh.service.ProductService;
import com.zosh.service.UserService;


@RestController
@RequestMapping("/api/seller/products")
public class SellerProductController {
	
	private ProductService productService;
	private UserService userService;
	
	public SellerProductController(ProductService productService, UserService userService) {
		this.productService = productService;
		this.userService = userService;
	}
	
	@PostMapping("/")
	public ResponseEntity<Product> createProductHandler(@RequestBody CreateProductRequest req, @RequestHeader("Authorization") String jwt) throws ProductException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Product createdProduct = productService.createProductSeller(req, user);
		
		return new ResponseEntity<Product>(createdProduct,HttpStatus.ACCEPTED);
		
	}
}
