import React, { Component } from 'react';
import Fragment from './../../hoc/Fragment/Fragment';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    total: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => this.setState({ error }));
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
    // this.setState({
    //   loading: true
    // });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   total: this.state.total,
    //   customer: {
    //     name: 'Bob B',
    //     address: {
    //       street: 'Teststreet 1',
    //       zipCode: '67437',
    //       country: 'Latvia'
    //     },
    //     email: 'test@test@com',
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order)
    //   .then(() => {
    //     this.setState({
    //       loading: false, purchasing: false
    //     })
    //   })
    //   .catch(() => {
    //     this.setState({
    //       loading: false, purchasing: false
    //     })
    //   });
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    let orderSummary;
    let burger = this.state.error ? <p>Could not load ingredients</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            onIngredientAdded={this.addIngredientHandler}
            onIngredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            total={this.state.total}
            purchasable={this.state.purchasable}
            onPurchase={this.purchaseHandler} />
        </Fragment>
      )
      orderSummary = <OrderSummary
        total={this.state.total}
        ingredients={this.state.ingredients}
        onPurchaseCancel={this.purchaseCancelHandler}
        onPurchaseContinue={this.purchaseContinueHandler} />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <Fragment>
        <Modal show={this.state.purchasing}
          onClickedOutside={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);