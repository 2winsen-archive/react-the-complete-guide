import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions';
import { Element } from './../../../models/form/Element';
import { Ingredients } from './../../../models/Ingredients';
import { Order } from './../../../models/Order';
import { AppState } from './../../../store/reducers';

const classes = require('./ContactData.css');

interface Props extends React.Props<any> {
  ings: Ingredients,
  price: number,
  userId: string,
  token: string,
  loading: boolean,
  onOrderBurger: (order: Order, token: string) => void,
}

interface State {
  orderForm: {
    name: Element,
    street: Element,
    zipCode: Element,
    country: Element,
    email: Element,
    deliveryMethod: Element,
  },
  formIsValid: boolean,
  loading: boolean
}

class ContactData extends React.Component<Props, State> {
  public state: State = {
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
          isRequired: true,
          isEmail: true
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
    formIsValid: false,
    loading: false,
  }

  public orderHandler = (event: any) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const orderData = Object.entries(this.state.orderForm)
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val.value }), {});
    const order = {
      ingredients: this.props.ings,
      orderData,
      total: this.props.price.toString(),
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);
  }

  public changeHandler = (formIdentifier: string) => (event: any) => {
    const { orderForm } = this.state;
    const formItem = orderForm[formIdentifier];
    const { value } = event.target;
    const updatedOrderForm = {
      ...orderForm,
      [formIdentifier]: {
        ...formItem,
        value,
        valid: checkValidity(formItem.validation, value),
        touched: true
      }
    };
    const formIsValid = Object.entries(updatedOrderForm)
      .reduce((acc, [, { valid }]) => acc && valid, true);
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid
    });
  }

  public render() {
    const formElementsArray = [];
    for (const key of Object.keys(this.state.orderForm)) {
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
            onChange={this.changeHandler(formElement.id)} />
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

const mapStateToProps = (state: AppState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onOrderBurger: (order: Order, token: string) => dispatch(actions.purchaseBurger(order, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));