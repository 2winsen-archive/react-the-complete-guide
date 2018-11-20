import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions';
import { Element } from './../../models/form/Element';
import { AppState } from './../../store/reducers';

const classes = require('./Auth.css');

interface Props extends React.Props<any> {
  buildingBurger: boolean,
  onSetAuthRedirectPath: () => void,
  onAuth: (email: string, password: string, isSignup: boolean) => void,
  loading: boolean,
  error: any,
  isAuthenticated: boolean,
  authRedirectPath: string,
}

interface State {
  controls: {
    email: Element,
    password: Element
  },
  isSignup: boolean,
  authRedirectPath: string
}

class Auth extends React.Component<Props, State> {
  public state: State = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          isRequired: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          isRequired: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    isSignup: true,
    authRedirectPath: null
  }

  public componentDidMount() {
    if (!this.props.buildingBurger && this.state.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  public changeHandler = (formIdentifier: string) => {
    return (event: any) => {
      const { controls } = this.state;
      const formItem = controls[formIdentifier];
      const { value } = event.target;
      const updatedControls = {
        ...controls,
        [formIdentifier]: {
          ...formItem,
          value,
          valid: checkValidity(formItem.validation, value),
          touched: true
        }
      };
      this.setState({ controls: updatedControls });
    };
  }

  public submitHandler = (event: any) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  }

  public switchAuthState = () => {
    this.setState(state => {
      return {
        isSignup: !state.isSignup
      }
    });
  }

  public render() {
    const formElementsArray = [];
    for (const key of Object.keys(this.state.controls)) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        onChange={this.changeHandler(formElement.id)} />
    ));

    if (this.props.loading) {
      form = [<Spinner key="spinner" />];
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          btnType="Danger"
          onClick={this.switchAuthState}
        >
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
