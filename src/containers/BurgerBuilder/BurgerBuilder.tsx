import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IngredientName } from 'src/models/IngredientName';
import { Ingredients } from 'src/models/Ingredients';

import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Fragment from '../../hoc/Fragment/Fragment';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import { AppState } from './../../store/reducers';

interface Props {
  onInitIngredients: () => void,
  onSetAuthRedirectPath?: (path: string) => void,
  onInitPurchase?: () => void,
  onIngredientAdded?: () => void,
  onIngredientRemoved?: () => void,
  isAuthenticated?: boolean,
  ings?: Ingredients,
  error?: string,
  price?: number,
  history?: any,
}

interface State {
  purchasing: boolean,
}

export class BurgerBuilder extends React.Component<Props, State> {
  public state: State = {
    purchasing: false
  }

  public componentDidMount() {
    this.props.onInitIngredients();
  }

  public updatePurchaseState = (ingredients: Ingredients) => {
    const sum = Object.values(ingredients)
      .reduce((agg, curr) => agg + curr);
    return sum > 0;
  }

  public purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  public purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  public purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  public render() {
    const disabledInfo = { ...this.props.ings };
    for (const key of Object.keys(disabledInfo)) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    let orderSummary;
    let burger = this.props.error ? <p>Could not load ingredients</p> : <Spinner />;
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
            onPurchase={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Fragment>
      )
      orderSummary = <OrderSummary
        total={this.props.price}
        ingredients={this.props.ings}
        onPurchaseCancel={this.purchaseCancelHandler}
        onPurchaseContinue={this.purchaseContinueHandler} />
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

const mapStateToProps = (state: AppState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onIngredientAdded: (ingName: IngredientName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName: IngredientName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path: string) => dispatch(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));