import React, { Component } from 'react';

import Fragment from '../../hoc/Fragment';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  render() {
    return (
      <Fragment>
        <Toolbar />
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