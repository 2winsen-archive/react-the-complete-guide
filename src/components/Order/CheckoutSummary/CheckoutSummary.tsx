import * as React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { Ingredients } from './../../../models/Ingredients';

const classes = require('./CheckoutSummary.css');

interface Props extends React.Props<any> {
  ingredients: Ingredients,
  onCheckoutCancelled: () => void,
  onCheckoutContinued: () => void
}

const CheckoutSummary: React.StatelessComponent<Props> = ({ ingredients, onCheckoutCancelled, onCheckoutContinued }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" onClick={onCheckoutCancelled}>CANCEL</Button>
      <Button btnType="Success" onClick={onCheckoutContinued}>CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;