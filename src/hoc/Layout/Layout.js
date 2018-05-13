import React, { Component } from 'react';

import Fragment from '../Fragment/Fragment';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  drawerToggleHandler = () => {
    this.setState(state => ({
      showSideDrawer: !state.showSideDrawer
    }));

  }

  render() {
    return (
      <Fragment>
        <Toolbar onDrawerToggle={this.drawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          onClick={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;