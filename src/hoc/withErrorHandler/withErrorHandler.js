import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Fragment from '../Fragment/Fragment';

const withErrorHandler = (WrappedComponent, axios) => {
  const withErrorHandlerComponent = class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      axios.interceptors.response.use(resp => resp, error => {
        this.setState({ error });
      });
    }

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            onClickedOutside={() => this.setState({ error: null })}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment >
      )
    }
  }
  withErrorHandlerComponent.displayName = `${WrappedComponent.displayName}_withErrorHandler`;
  return withErrorHandlerComponent;
};

export default withErrorHandler;