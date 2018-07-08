import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h1>Enter your contact data</h1>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your eMail" />
        <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
        <Button btnType="Success">ORDER</Button>
      </div>
    );
  }
}

export default ContactData;