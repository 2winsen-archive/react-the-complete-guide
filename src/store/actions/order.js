import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, order) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  id,
  order
});

export const purchaseBurgerFailed = error => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = order => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', order)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, order));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error))
      });
  }
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
      .then(res => {
        const orders = [];
        for (let key in res.data) {
          orders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error))
      });
  };
}