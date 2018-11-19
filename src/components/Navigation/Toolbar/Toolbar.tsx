import * as React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import DrawerToggle from './../SideDrawer/DrawerToggle/DrawerToggle';

const classes = require('./Toolbar.css');

interface Props extends React.Props<any> {
  isAuthenticated: boolean,
  onDrawerToggle: () => void
}

const Toolbar = (props: Props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle onClick={props.onDrawerToggle} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems
        isAuthenticated={props.isAuthenticated}
      />
    </nav>
  </header>
);

export default Toolbar;