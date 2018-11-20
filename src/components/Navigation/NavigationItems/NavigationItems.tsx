import * as React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const classes = require('./NavigationItems.css');

interface Props extends React.Props<any> {
  isAuthenticated?: boolean
}

const NavigationItems = (props: Props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {
      props.isAuthenticated
        ? <NavigationItem link="/logout">Logout</NavigationItem>
        : <NavigationItem link="/auth">Authenticate</NavigationItem>
    }

  </ul>
);

export default NavigationItems;