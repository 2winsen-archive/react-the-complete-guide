import React from 'react';

import NavigationItems from './../NavigationItems/NavigationItems';
import Logo from './../../Logo/Logo';

import classes from './SideDrawer.css';

const SideDrawer = () => {
  return (
    <div className={classes.SideDrawer}>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideDrawer;