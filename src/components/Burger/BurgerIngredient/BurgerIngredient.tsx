import * as React from 'react';

const classes = require('./BurgerIngredient.css');

interface Props extends React.Props<any> {
  type: 'bread-bottom' | 'bread-top' | 'meat' | 'cheese' | 'bacon' | 'salad'
}

const BurgerIngredient = (props: Props) => {
  let ingredient = null;
  switch (props.type) {
    case ('bread-bottom'):
      ingredient = <div className={classes.BreadBottom} />
      break;
    case ('bread-top'):
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      )
      break;
    case ('meat'):
      ingredient = <div className={classes.Meat} />
      break;
    case ('cheese'):
      ingredient = <div className={classes.Cheese} />
      break;
    case ('bacon'):
      ingredient = <div className={classes.Bacon} />
      break;
    case ('salad'):
      ingredient = <div className={classes.Salad} />
      break;
    default:
      ingredient = <div>Unknown</div>
      break;
  }
  return ingredient;
};

export default BurgerIngredient;