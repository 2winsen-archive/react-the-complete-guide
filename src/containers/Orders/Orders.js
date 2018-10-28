import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders =
      this.props.orders.map(o => (
        <Order key={o.id} ingredients={o.ingredients} total={o.total} />
      ))
    if (this.props.loading) {
      orders = <Spinner />
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));