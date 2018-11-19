import { IngredientName } from 'src/models/IngredientName';
import { Ingredients } from 'src/models/Ingredients';

import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientName: IngredientName) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngredient = (ingredientName: IngredientName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName
});

export const setIngredients = (ingredients: Ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENTS
});