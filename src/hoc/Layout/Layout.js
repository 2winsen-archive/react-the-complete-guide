import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          onDrawerToggle={this.drawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          onClick={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);