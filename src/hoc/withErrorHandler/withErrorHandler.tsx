import { AxiosInstance } from 'axios';
import * as React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Fragment from '../Fragment/Fragment';

interface State {
  error: any
}

const withErrorHandler = (WrappedComponent: React.ComponentClass, axios: AxiosInstance) => {
  const WithErrorHandlerComponent = class extends React.Component<{}, State> {
    public state: State = {
      error: null
    }
    public displayName = `withErrorHandler(${WrappedComponent.displayName || WrappedComponent.name})`;

    private reqInterceptors: any;
    private resInterceptors: any;

    public componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(resp => resp, error => {
        this.setState({ error });
      });
    }

    public componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    public onClickedOutsideHandler = () => this.setState({ error: null });

    public render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            onClickedOutside={this.onClickedOutsideHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment >
      )
    }
  }
  return WithErrorHandlerComponent;
};

export default withErrorHandler;