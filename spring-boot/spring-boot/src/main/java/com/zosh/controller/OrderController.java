package com.zosh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.exception.OrderException;
import com.zosh.exception.OrderItemException;
import com.zosh.exception.UserException;
import com.zosh.modal.Address;
import com.zosh.modal.Order;
import com.zosh.modal.OrderItem;
import com.zosh.modal.User;
import com.zosh.service.OrderItemService;
import com.zosh.service.OrderService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	private OrderService orderService;
	private OrderItemService orderItemService;
	private UserService userService;
	
	public OrderController(OrderService orderService,UserService userService, OrderItemService orderItemService) {
		this.orderService=orderService;
		this.userService=userService;
		this.orderItemService=orderItemService;
	}
	
	@PostMapping("/")
	public ResponseEntity<Order> createOrderHandler(@RequestBody Address shippingAddress,
			@RequestHeader("Authorization")String jwt) throws UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Order order =orderService.createOrder(user, shippingAddress);
		
		return new ResponseEntity<Order>(order,HttpStatus.OK);
		
	}
	
//	@GetMapping("/user")
//	public ResponseEntity< List<Order>> usersOrderHistoryHandler(@RequestHeader("Authorization") 
//	String jwt) throws OrderException, UserException{
//		
//		User user=userService.findUserProfileByJwt(jwt);
//		List<Order> orders=orderService.usersOrderHistory(user.getId());
//		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
//	}
//	
	@GetMapping("/order/{orderId}")
	public ResponseEntity< Order> findOrder(@PathVariable Long orderId, @RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException, OrderItemException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Order orders=orderItemService.findOrderById(orderId).getOrder();
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/user")
	public ResponseEntity< List<OrderItem>> usersOrderHistoryHandler(@RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		List<OrderItem> orders=orderItemService.usersOrderIteHistory(user.getId());
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity< OrderItem> findOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") 
	String jwt) throws UserException, OrderItemException{
		
		User user=userService.findUserProfileByJwt(jwt);
		OrderItem orders=orderItemService.findOrderById(orderId);
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/userOrder/{orderId}")
	public ResponseEntity< Order> findUserOrder(@PathVariable Long orderId, @RequestHeader("Authorization") 
	String jwt) throws UserException, OrderException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Order orders=orderService.findOrderById(orderId);
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<OrderItem> canceledOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderItemException{
		OrderItem order=orderItemService.cancledOrder(orderId);
		return new ResponseEntity<OrderItem>(order,HttpStatus.ACCEPTED);
	}

}
