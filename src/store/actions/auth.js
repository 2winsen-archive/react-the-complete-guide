import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_KEY } from '../../api';

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  authData
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      })
  };
}