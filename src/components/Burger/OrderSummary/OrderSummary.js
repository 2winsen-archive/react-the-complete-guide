import React from 'react';

import Fragment from '../../../hoc/Fragment';

const OrderSummary = (props) => {
  const summaryIngredients = Object.keys(props.ingredients)
    .map(key => (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
      </li>
    ))
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {summaryIngredients}
      </ul>
      <p>Continue to Checkout?</p>
    </Fragment>
  );
};

export default OrderSummary;