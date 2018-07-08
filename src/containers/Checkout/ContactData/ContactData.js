import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      total: this.props.total,
      customer: {
        name: 'Bob B',
        address: {
          street: 'Teststreet 1',
          zipCode: '67437',
          country: 'Latvia'
        },
        email: 'test@test@com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(() => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your eMail" />
        <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
        <Button btnType="Success" onClick={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h1>Enter your contact data</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;