import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])]
        .map((el, index) =>
          <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
        );
    })
    .reduce((acc, curr) => acc.concat(curr), [])
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default Burger;