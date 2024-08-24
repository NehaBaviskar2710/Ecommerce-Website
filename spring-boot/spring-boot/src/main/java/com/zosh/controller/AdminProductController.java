package com.zosh.controller;

import java.util.List;

import org.springframework.data.domain.Page;
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

import com.zosh.exception.ProductException;
import com.zosh.exception.UserException;
import com.zosh.modal.Product;
import com.zosh.modal.User;
import com.zosh.request.CreateProductRequest;
import com.zosh.response.ApiResponse;
import com.zosh.service.ProductService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {
	
	private ProductService productService;
	private UserService userService;
	
	public AdminProductController(ProductService productService, UserService userService) {
		this.productService = productService;
		this.userService = userService;
	}
	
	@PostMapping("/")
	public ResponseEntity<Product> createProductHandler(@RequestBody CreateProductRequest req, @RequestHeader("Authorization") String jwt) throws ProductException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Product createdProduct = productService.createProductSeller(req, user);
		
		return new ResponseEntity<Product>(createdProduct,HttpStatus.ACCEPTED);
		
	}
	@PostMapping("/create/")
	public ResponseEntity<Product> createProductHandler(@RequestBody CreateProductRequest req) throws ProductException{
		
		Product createdProduct = productService.createProduct(req);
		
		return new ResponseEntity<Product>(createdProduct,HttpStatus.ACCEPTED);
		
	}
	
	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> deleteProductHandler(@PathVariable Long productId) throws ProductException{
		
		System.out.println("dlete product controller .... ");
		String msg=productService.deleteProduct(productId);
		System.out.println("dlete product controller .... msg "+msg);
		ApiResponse res=new ApiResponse(msg,true);
		
		return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> findAllProduct(){
		
		List<Product> products = productService.getAllProducts();
		
		return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
	}
	
	@GetMapping("/sellerProducts")
	public ResponseEntity<Page<Product>> findAllProductByUserId(@RequestParam String category,
			@RequestParam List<String>color,@RequestParam List<String> size,@RequestParam Integer minPrice,
			@RequestParam Integer maxPrice, @RequestParam Integer minDiscount, @RequestParam String sort, 
			@RequestParam String stock, @RequestParam Integer pageNumber,@RequestParam Integer pageSize,
			@RequestHeader("Authorization") String jwt) throws UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Page<Product> res = productService.getAllProductByUserId(user.getId(), category, color, size, minPrice, maxPrice, minDiscount, sort,stock,pageNumber,pageSize);
		
		System.out.println(res.getNumberOfElements());
		for (Product product : res) {
			System.out.println("------------------------");
			System.out.println(product.getTitle());
		}
		System.out.println("complete products");
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/update/{productId}")
	public ResponseEntity<Product> updateProductHandler(@RequestBody Product req,@PathVariable Long productId) throws ProductException{
		
		Product updatedProduct=productService.updateProduct(productId, req);
		
		return new ResponseEntity<Product>(updatedProduct,HttpStatus.OK);
	}
	
	@PostMapping("/creates")
	public ResponseEntity<ApiResponse> createMultipleProduct(@RequestBody CreateProductRequest[] reqs) throws ProductException{
		
		for(CreateProductRequest product:reqs) {
			productService.createProduct(product);
		}
		
		ApiResponse res=new ApiResponse("products created successfully",true);
		return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
	}

}
