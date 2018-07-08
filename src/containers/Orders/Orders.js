import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const orders = [];
        for (let key in res.data) {
          orders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    let orders =
      this.state.orders.map(o => (
        <Order key={o.id} ingredients={o.ingredients} total={o.total} />
      ))
    if (this.state.loading) {
      orders = <Spinner />
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);