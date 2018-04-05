import React, { Component } from 'react';
import Fragment from './../../hoc/Fragment';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    total: 4
  }

  addIngredientHandler = (type) => {
    this.setState((prevState) => ({
      ingredients: { ...prevState.ingredients, [type]: prevState.ingredients[type] + 1 },
      total: prevState.total += INGREDIENTS_PRICES[type]
    }));
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }
    this.setState((prevState) => ({
      ingredients: { ...prevState.ingredients, [type]: prevState.ingredients[type] - 1 },
      total: prevState.total -= INGREDIENTS_PRICES[type]
    }));
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onIngredientAdded={this.addIngredientHandler}
          onIngredientRemoved={this.removeIngredientHandler}
          ingredients={{ ...this.state.ingredients }}
          total={this.state.total} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;