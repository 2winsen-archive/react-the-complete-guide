import axios from 'axios';
import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { API_KEY } from '../../api';
import * as actions from '../actions';
import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga() {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action: actionTypes.AuthCheckTimeout) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action: actionTypes.AuthUser) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
  if (!action.isSignup) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000).valueOf();
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate.toString());
    localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(+localStorage.getItem('expirationDate'));
    if (expirationDate >= new Date()) {
      const userId = localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId || 'undefined'));
      const diff = expirationDate.getTime() - new Date().getTime();
      yield put(actions.checkAuthTimeout(diff / 1000));
    } else {
      yield put(actions.logout());
    }
  }
}