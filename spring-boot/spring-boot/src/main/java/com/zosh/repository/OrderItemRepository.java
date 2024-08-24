package com.zosh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zosh.modal.Order;
import com.zosh.modal.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

	public List<OrderItem> findByOrderId(Long orderId);
	
	public List<OrderItem> findBySellerId(Long sellerId);
	
	public List<OrderItem> findByUserId(Long userId);
}
