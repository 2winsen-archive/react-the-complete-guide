import * as React from 'react';
import { Ingredients } from 'src/models/Ingredients';

import Fragment from '../../../hoc/Fragment/Fragment';
import Button from '../../UI/Button/Button';

interface Props extends React.Props<any> {
  ingredients: Ingredients,
  onPurchaseCancel: () => void,
  onPurchaseContinue: () => void,
  total: number
}

const OrderSummary = (props: Props) => {
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
      <p><strong>Price: {props.total.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" onClick={props.onPurchaseCancel}>CANCEL</Button>
      <Button btnType="Success" onClick={props.onPurchaseContinue}>CONTINUE</Button>
    </Fragment>
  );
};

export default OrderSummary;