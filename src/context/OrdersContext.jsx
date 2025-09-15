import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();
export const useOrders = () => useContext(OrdersContext);

const getInitialOrders = (userId) => {
  if (!userId) return [];
  const stored = localStorage.getItem(`orders_${userId}`);
  return stored ? JSON.parse(stored) : [];
};

export const OrdersProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [orders, setOrders] = useState(() => getInitialOrders(userId));

  useEffect(() => {
    setOrders(getInitialOrders(userId));
  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`orders_${userId}`, JSON.stringify(orders));
    }
  }, [orders, userId]);

  const addOrder = (order) => {
    setOrders(prev => [
      { ...order, id: Date.now(), date: new Date().toISOString() },
      ...prev
    ]);
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  return (
    <OrdersContext.Provider value={{ 
      orders, 
      addOrder, 
      getOrderById, 
      updateOrderStatus 
    }}>
      {children}
    </OrdersContext.Provider>
  );
};
