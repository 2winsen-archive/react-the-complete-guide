import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 });
      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
      });
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 });
      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
      });
    }
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true
      });
    default:
      return state;
  }
}

export default reducer;