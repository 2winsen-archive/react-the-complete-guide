import * as React from 'react';
import { IngredientName } from 'src/models/IngredientName';
import { Ingredients } from 'src/models/Ingredients';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const classes = require('./Burger.css');

interface Props extends React.Props<any> {
  ingredients: Ingredients
}

const Burger = (props: Props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientKey: IngredientName) => {
      const sameIngredients = [...Array(props.ingredients[ingredientKey])].fill(0);
      return sameIngredients
        .map((el, index) =>
          <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
        );
    })
    .reduce((acc, curr) => acc.concat(curr), [])
  if (transformedIngredients.length === 0) {
    transformedIngredients = [<p key="placeholder">Please start adding ingredients</p>]
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;