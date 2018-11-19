import { Action } from 'redux';

import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

export interface State {
  orders: Array<[]>,
  loading: boolean,
  purchased: boolean
};

const initialState: State = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state: State): State => {
  return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state: State): State => {
  return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state: State, action: actionTypes.PurchaseBurgerSuccess): State => {
  const newOrder = updateObject(action.order, { id: action.id });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: [...state.orders, newOrder]
  });
}

const purchaseBurgerFailed = (state: State): State => {
  return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state: State): State => {
  return updateObject(state, { loading: true });
}

const fetchOrdersSuccess = (state: State, action: actionTypes.FetchOrdersSuccess): State => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
}

const fetchOrdersFail = (state: State): State => {
  return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action as actionTypes.PurchaseBurgerSuccess);
    case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state);
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action as actionTypes.FetchOrdersSuccess);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
    default: return state;
  }
}

export default reducer;