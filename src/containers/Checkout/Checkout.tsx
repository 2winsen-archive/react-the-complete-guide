import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from './../../models/Ingredients';
import { AppState } from './../../store/reducers';
import ContactData from './ContactData/ContactData';

interface Props {
  ings: Ingredients,
  history: any,
  purchased: boolean,
  match: any,
}

class Checkout extends React.Component<Props> {
  public onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  public onCheckoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  public render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.onCheckoutCancelledHandler}
            onCheckoutContinued={this.onCheckoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
}

export default connect(mapStateToProps)(Checkout);