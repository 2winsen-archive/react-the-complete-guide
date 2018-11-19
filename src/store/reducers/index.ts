import { combineReducers } from 'redux';

import authReducer, { State as AuthState } from '../reducers/auth';
import burgerBuilderReducer, { State as BurgerBuilderState } from '../reducers/burgerBuilder';
import orderReducer, { State as OrderState } from '../reducers/order';

export interface AppState {
  auth: AuthState;
  burgerBuilder: BurgerBuilderState;
  order: OrderState;
};

export const rootReducer = combineReducers<AppState>({
  auth: authReducer,
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
});