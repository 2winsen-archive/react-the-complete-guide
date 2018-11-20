import { Action } from 'redux';

import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';
import { Ingredients } from './../../models/Ingredients';

export interface State {
  ingredients: Ingredients,
  totalPrice: number,
  error: boolean,
  building: boolean
};

const initialState: State = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
}

const addIngredient = (state: State, action: actionTypes.AddIngredient): State => {
  const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 });
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
    building: true
  });
}

const removeIngredient = (state: State, action: actionTypes.RemoveIngredient): State => {
  const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 });
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
    building: true
  });
}

const setIngredients = (state: State, action: actionTypes.SetIngredients): State => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  });
}

const fetchIngredientsFailed = (state: State): State => {
  return updateObject(state, { error: true });
}

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action as actionTypes.AddIngredient);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action as actionTypes.RemoveIngredient);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action as actionTypes.SetIngredients);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
    default: return state;
  }
}

export default reducer;