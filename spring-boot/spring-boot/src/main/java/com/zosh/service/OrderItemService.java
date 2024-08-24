package com.zosh.service;

import java.util.List;

import com.zosh.exception.OrderException;
import com.zosh.exception.OrderItemException;
import com.zosh.modal.Order;
import com.zosh.modal.OrderItem;

public interface OrderItemService {
	
	public OrderItem createOrderItem(OrderItem orderItem);
	
	public List<OrderItem> findOrderItemsByOrderId(Long orderId);
	
	public List<OrderItem> findOrderItemsBySellerId(Long sellerId);
	
	public OrderItem placedOrder(Long orderId) throws OrderItemException;
	
	public OrderItem confirmedOrder(Long orderId)throws OrderItemException;
	
	public OrderItem shippedOrder(Long orderId) throws OrderItemException;
	
	public OrderItem deliveredOrder(Long orderId) throws OrderItemException;
	
	public OrderItem cancledOrder(Long orderId) throws OrderItemException;
	
	public void deleteOrder(Long orderId) throws OrderItemException;

	public OrderItem findOrderById(Long orderId) throws OrderItemException;
	
	public List<OrderItem> usersOrderIteHistory(Long userId);
	

}
