package com.zosh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.zosh.exception.OrderException;
import com.zosh.exception.OrderItemException;
import com.zosh.modal.Order;
import com.zosh.modal.OrderItem;
import com.zosh.repository.OrderItemRepository;
import com.zosh.user.domain.OrderStatus;
import com.zosh.user.domain.PaymentStatus;

@Service
public class OrderItemServiceImplementation implements OrderItemService {

	private OrderItemRepository orderItemRepository;
	public OrderItemServiceImplementation(OrderItemRepository orderItemRepository) {
		this.orderItemRepository=orderItemRepository;
	}
	@Override
	public OrderItem createOrderItem(OrderItem orderItem) {
		
		return orderItemRepository.save(orderItem);
	}

	@Override
	public List<OrderItem> findOrderItemsByOrderId(Long orderId){
		
		return orderItemRepository.findByOrderId(orderId);
	}
	
	@Override
	public List<OrderItem> findOrderItemsBySellerId(Long sellerId){
		
		return orderItemRepository.findBySellerId(sellerId);
	}
	
	@Override
	public OrderItem placedOrder(Long orderId) throws OrderItemException {
		OrderItem order= findOrderById(orderId);
		order.setOrderStatus(OrderStatus.PLACED);
//		order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);
		return order;
	}

	@Override
	public OrderItem confirmedOrder(Long orderId) throws OrderItemException {
		OrderItem order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.CONFIRMED);
		
		
		return orderItemRepository.save(order);
	}

	@Override
	public OrderItem shippedOrder(Long orderId) throws OrderItemException {
		OrderItem order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.SHIPPED);
		return orderItemRepository.save(order);
	}

	@Override
	public OrderItem deliveredOrder(Long orderId) throws OrderItemException {
		OrderItem order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.DELIVERED);
		return orderItemRepository.save(order);
	}

	@Override
	public OrderItem cancledOrder(Long orderId) throws OrderItemException {
		OrderItem order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.CANCELLED);
		return orderItemRepository.save(order);
	}
	
	@Override
	public void deleteOrder(Long orderId) throws OrderItemException {
		OrderItem order =findOrderById(orderId);
		
		orderItemRepository.deleteById(orderId);
		
	}
	
	@Override
	public OrderItem findOrderById(Long orderId) throws OrderItemException {
		Optional<OrderItem> opt=orderItemRepository.findById(orderId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new OrderItemException("order item not exist with id "+orderId);
	}
	
	@Override
	public List<OrderItem> usersOrderIteHistory(Long userId) {
		List<OrderItem> orders=orderItemRepository.findByUserId(userId);
		return orders;
	}
}

