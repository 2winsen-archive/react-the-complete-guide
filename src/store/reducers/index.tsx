import { combineReducers } from 'redux';
import authReducer from '../reducers/auth';
import burgerBuilderReducer from '../reducers/burgerBuilder';
import orderReducer from '../reducers/order';

export interface State {
  auth: any;
  burgerBuilder: any;
  order: any;
};

export const rootReducer = combineReducers<State>({
  auth: authReducer,
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
});