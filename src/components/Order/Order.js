import React from 'react';

import classes from './Order.css';

const Order = () => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Salad (1)</p>
      <p>Price: <strong>USD 4.53</strong></p>
    </div>
  );
};

export default Order;