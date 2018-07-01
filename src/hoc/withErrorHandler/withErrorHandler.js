import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Fragment from '../Fragment/Fragment';

const withErrorHandler = (WrappedComponent, axios) => {
  const withErrorHandlerComponent = class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.reqInstreceptors = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      this.resInstreceptors = axios.interceptors.response.use(resp => resp, error => {
        this.setState({ error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInstreceptors);
      axios.interceptors.response.eject(this.resInstreceptors);
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
  withErrorHandlerComponent.displayName = `withErrorHandler(${WrappedComponent.displayName || WrappedComponent.name})`;
  return withErrorHandlerComponent;
};

export default withErrorHandler;