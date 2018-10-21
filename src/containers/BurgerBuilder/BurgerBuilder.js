import React, { Component } from 'react';
import Fragment from './../../hoc/Fragment/Fragment';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => this.setState({ error }));
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients)
      .reduce((sum, val) => sum + val);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = { ...this.props.ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    let orderSummary;
    let burger = this.state.error ? <p>Could not load ingredients</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            onIngredientAdded={this.props.onIngredientAdded}
            onIngredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            total={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            onPurchase={this.purchaseHandler} />
        </Fragment>
      )
      orderSummary = <OrderSummary
        total={this.props.price}
        ingredients={this.props.ings}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));