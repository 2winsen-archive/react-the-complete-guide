import * as React from 'react';

import Fragment from '../../../hoc/Fragment/Fragment';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';

const classes = require('./SideDrawer.css');

interface Props extends React.Props<any> {
  open: boolean,
  isAuthenticated: boolean,
  onClick: () => void
}

const SideDrawer = (props: Props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} onClick={props.onClick} />
      <div className={attachedClasses.join(' ')} onClick={props.onClick}>
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