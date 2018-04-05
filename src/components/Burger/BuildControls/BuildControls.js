import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.total.toFixed(2)}</strong></p>
      {controls.map(c =>
        <BuildControl
          key={c.label}
          label={c.label}
          onMoreClick={() => props.onIngredientAdded(c.type)}
          onLessClick={() => props.onIngredientRemoved(c.type)}
          disabled={props.disabled[c.type]} />
      )}
      <button className={classes.OrderButton} disabled={!props.purchasable}>Order Now</button>
    </div>
  );
};

BuildControls.propTypes = {
  onIngredientAdded: PropTypes.func,
  onIngredientRemoved: PropTypes.func,
  disabled: PropTypes.object,
  total: PropTypes.number,
  purchasable: PropTypes.bool
}

export default BuildControls;