import * as React from 'react';
import { NavLink } from 'react-router-dom';

const classes = require('./NavigationItem.css');

interface Props extends React.Props<any> {
  link: string,
  exact?: boolean
}

const NavigationItem = (props: Props) => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} activeClassName={classes.active} exact={props.exact}>{props.children}</NavLink>
  </li>
);

export default NavigationItem;