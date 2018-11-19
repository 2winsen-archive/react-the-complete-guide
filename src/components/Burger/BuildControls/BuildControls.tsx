import * as React from 'react';

import BuildControl from './BuildControl/BuildControl';

const classes = require('./BuildControls.css');

interface Props extends React.Props<any> {
  onIngredientAdded: (event: any) => void,
  onIngredientRemoved: (event: any) => void,
  total: number,
  purchasable: boolean,
  onPurchase: () => void,
  isAuthenticated: boolean,
  disabled: any
}

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControls = (props: Props) => {
  const moreClickHandler = (control: any) => () => props.onIngredientAdded(control.type);
  const lessClickHandler = (control: any) => () => props.onIngredientRemoved(control.type);

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.total.toFixed(2)}</strong></p>
      {controls.map(c =>
        <BuildControl
          key={c.label}
          label={c.label}
          onMoreClick={moreClickHandler(c)}
          onLessClick={lessClickHandler(c)}
          disabled={props.disabled[c.type]} />
      )}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.onPurchase}>{props.isAuthenticated ? 'Order Now' : 'SIGN UP TO ORDER'}</button>
    </div>
  );
};

export default BuildControls;