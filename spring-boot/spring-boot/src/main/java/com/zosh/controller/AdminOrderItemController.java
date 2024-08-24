package com.zosh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.exception.OrderException;
import com.zosh.exception.OrderItemException;
import com.zosh.exception.UserException;
import com.zosh.modal.Order;
import com.zosh.modal.OrderItem;
import com.zosh.modal.User;
import com.zosh.response.ApiResponse;
import com.zosh.service.OrderItemService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/admin/ordersItems")
public class AdminOrderItemController {

private OrderItemService orderItemService;
private UserService userService;
	
	public AdminOrderItemController(OrderItemService orderItemService, UserService userService) {
		this.orderItemService=orderItemService;
		this.userService=userService;
	}
	
	@GetMapping("/")
	public ResponseEntity<List<OrderItem>> getAllOrderItems(@RequestHeader("Authorization")String jwt) throws UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		System.out.println(user.getId());
		List<OrderItem> orders=orderItemService.findOrderItemsBySellerId(user.getId());
		
		for(OrderItem orderItem : orders) {
			System.out.println(orderItem.getProduct().getTitle());
		}
		
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/confirmed")
	public ResponseEntity<OrderItem> ConfirmedOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderItemException{
		OrderItem order=orderItemService.confirmedOrder(orderId);
		return new ResponseEntity<OrderItem>(order,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/ship")
	public ResponseEntity<OrderItem> shippedOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderItemException{
		OrderItem order=orderItemService.shippedOrder(orderId);
		return new ResponseEntity<OrderItem>(order,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/deliver")
	public ResponseEntity<OrderItem> deliveredOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderItemException{
		OrderItem order=orderItemService.deliveredOrder(orderId);
		return new ResponseEntity<OrderItem>(order,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<OrderItem> canceledOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderItemException{
		OrderItem order=orderItemService.cancledOrder(orderId);
		return new ResponseEntity<OrderItem>(order,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponse> deleteOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderItemException{
		orderItemService.deleteOrder(orderId);
		ApiResponse res=new ApiResponse("Order Item Deleted Successfully",true);
		System.out.println("delete method working....");
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
	}
}
