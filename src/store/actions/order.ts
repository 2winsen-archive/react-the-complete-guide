import { Order } from 'src/models/Order';

import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id: string, order: any) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  id,
  order
});

export const purchaseBurgerFailed = (error: string) => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (order: Order, token: string) => ({
  type: actionTypes.PURCHASE_BURGER,
  order,
  token
});

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = (orders: Order[]) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = (error: string) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token: string, userId: string) => ({
  type: actionTypes.FETCH_ORDERS,
  token,
  userId
});