import React, { Component } from 'react';
import Fragment from './../../hoc/Fragment';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    total: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = () => {
    const sum = Object.values(this.state.ingredients)
      .reduce((sum, val) => sum + val);
    this.setState({
      purchasable: sum > 0
    });
  }

  addIngredientHandler = (type) => {
    this.setState((prevState) => ({
      ingredients: { ...prevState.ingredients, [type]: prevState.ingredients[type] + 1 },
      total: prevState.total += INGREDIENTS_PRICES[type]
    }), () => this.updatePurchaseState());
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }
    this.setState((prevState) => ({
      ingredients: { ...prevState.ingredients, [type]: prevState.ingredients[type] - 1 },
      total: prevState.total -= INGREDIENTS_PRICES[type]
    }), () => this.updatePurchaseState());
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    alert('You continue');
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    return (
      <Fragment>
        <Modal show={this.state.purchasing}
          onClickedOutside={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            onPurchaseCancel={this.purchaseCancelHandler}
            onPurchaseContinue={this.purchaseContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onIngredientAdded={this.addIngredientHandler}
          onIngredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          total={this.state.total}
          purchasable={this.state.purchasable}
          onPurchase={this.purchaseHandler} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;