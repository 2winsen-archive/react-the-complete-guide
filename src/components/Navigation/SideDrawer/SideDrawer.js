import React from 'react';

import NavigationItems from './../NavigationItems/NavigationItems';
import Logo from './../../Logo/Logo';
import Fragment from '../../../hoc/Fragment/Fragment';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.css';

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} onClick={props.onClick} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            isAuthenticated={props.isAuthenticated}
          />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;