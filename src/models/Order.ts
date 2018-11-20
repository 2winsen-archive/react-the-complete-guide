import { Ingredients } from './Ingredients';

export interface Order {
  id?: string,
  total: string,
  ingredients: Ingredients
}