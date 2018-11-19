import * as React from 'react';
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Fragment from '../Fragment/Fragment';
import { AppState } from './../../store/reducers';

const classes = require('./Layout.css');

interface State {
  showSideDrawer: boolean
}

interface Props {
  isAuthenticated: boolean
}

class Layout extends React.Component<Props, State> {
  public state = {
    showSideDrawer: false
  }

  public sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  public drawerToggleHandler = () => {
    this.setState(state => ({
      showSideDrawer: !state.showSideDrawer
    }));

  }

  public render() {
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

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);