import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';

import * as actions from '../../../store/actions';

interface Props {
  onLogout: () => void
}

class Logout extends React.Component<Props, {}> {
  public componentDidMount() {
    this.props.onLogout();
  }

  public render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);