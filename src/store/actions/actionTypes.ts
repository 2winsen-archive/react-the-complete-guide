import { Action } from 'redux';
import { IngredientName } from 'src/models/IngredientName';
import { Ingredients } from 'src/models/Ingredients';
import { Order } from 'src/models/Order';

export const INIT_INGREDIENTS = 'INIT_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export interface AddIngredient extends Action {
  ingredientName: IngredientName
};
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export interface RemoveIngredient extends Action {
  ingredientName: IngredientName
};
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export interface SetIngredients extends Action {
  ingredients: Ingredients
};
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export interface PurchaseBurgerSuccess extends Action {
  id: string,
  order: Order
}
export const PURCHASE_BURGER_FAILED = 'PURCHASE_BURGER_FAILED';
export const PURCHASE_INIT = 'PURCHASE_INIT';
export const PURCHASE_BURGER = 'PURCHASE_BURGER';
export interface PurchaseBurger extends Action {
  token: string,
  order: Order
};

export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export interface FetchOrdersSuccess extends Action {
  orders: Order[]
};
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export interface FetchOrders extends Action {
  userId: string,
  token: string
};

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export interface AuthSuccess extends Action {
  idToken: string,
  userId: string
};
export const AUTH_FAIL = 'AUTH_FAIL';
export interface AuthFail extends Action {
  error: string
};
export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
export interface AuthCheckTimeout extends Action {
  expirationTime: number
};
export const AUTH_USER = 'AUTH_USER';
export interface AuthUser extends Action {
  email: string,
  password: string,
  isSignup: boolean
};
export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';

export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';
export interface SetAuthRedirectPath extends Action {
  path: string
};

