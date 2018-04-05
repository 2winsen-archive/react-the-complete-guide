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
      {controls.map(c =>
        <BuildControl
          key={c.label}
          label={c.label}
          onMore={() => props.onIngredientAdded(c.type)} />
      )}
    </div>
  );
};

BuildControl.propTypes = {
  onIngredientAdded: PropTypes.func
}

export default BuildControls;