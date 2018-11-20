import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import axios from '../../axios-orders';
import OrderComponent from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import { Order } from './../../models/Order';
import { AppState } from './../../store/reducers';

interface Props {
  onFetchOrders: (token: string, userId: string) => void,
  token: string,
  userId: string,
  orders: Order[],
  loading: boolean,
}

class Orders extends React.Component<Props> {
  public componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  public render() {
    let orders =
      this.props.orders.map(o => (
        <OrderComponent key={o.id} ingredients={o.ingredients} total={o.total} />
      ))
    if (this.props.loading) {
      orders = [<Spinner key="spinner" />]
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onFetchOrders: (token: string, userId: string) => dispatch(actions.fetchOrders(token, userId))
  };
}

const mapStateToProps = (state: AppState) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));