import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          isRequired: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          isRequired: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          isRequired: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          isRequired: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          isRequired: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'cheapest',
        validation: {},
        valid: true,
      }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const orderData = Object.entries(this.state.orderForm)
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val.value }), {});
    const order = {
      ingredients: this.props.ings,
      orderData,
      total: this.props.price
    }
    this.props.onOrderBurger(order);
  }

  changeHandler = (event, formIdentifier) => {
    const { orderForm } = this.state;
    const formItem = orderForm[formIdentifier];
    const { value } = event.target;
    const updatedOrderForm = {
      ...orderForm,
      [formIdentifier]: {
        ...formItem,
        value,
        valid: this.checkValidity(formItem.validation, value),
        touched: true
      }
    };
    let formIsValid = Object.entries(updatedOrderForm)
      .reduce((acc, [, { valid }]) => acc && valid, true);
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid
    });
  }

  checkValidity = (rules, value) => {
    let isValid = true;
    if (rules.isRequired) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={(event) => this.changeHandler(event, formElement.id)} />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          onClick={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: order => dispatch(actions.purchaseBurger(order))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));