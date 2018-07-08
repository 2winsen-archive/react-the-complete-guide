import React from 'react';

import classes from './Order.css';

const Order = ({ ingredients, total }) => {
  const ingredientsArr = [];
  for (const key in ingredients) {
    if (ingredients.hasOwnProperty(key)) {
      ingredientsArr.push({
        name: key,
        amount: ingredients[key]
      });
    }
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsArr.map(i => (
        <span style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }} key={i.name}>{i.name}: {i.amount}</span>
      ))}</p>
      <p>Price: <strong>USD {parseFloat(total).toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;