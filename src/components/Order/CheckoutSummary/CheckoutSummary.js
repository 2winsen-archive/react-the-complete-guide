import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const CheckoutSummary = ({ ingredients, onCheckoutCancelled, onCheckoutContinued }) => {
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