import { Action } from 'redux';

import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

export interface State {
  token: string,
  userId: string,
  error: string,
  loading: boolean,
  authRedirectPath: string
};

const initialState: State = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = (state: State): State => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const authSuccess = (state: State, action: actionTypes.AuthSuccess): State => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    loading: false,
    error: null
  });
}

const authFail = (state: State, action: actionTypes.AuthFail): State => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const authLogout = (state: State): State => {
  return updateObject(state, {
    token: null,
    userId: null
  });
}

const setAuthRedirectPath = (state: State, action: actionTypes.SetAuthRedirectPath): State => {
  return updateObject(state, {
    authRedirectPath: action.path,
  });
}


const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action as actionTypes.AuthSuccess);
    case actionTypes.AUTH_FAIL: return authFail(state, action as actionTypes.AuthFail);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action as actionTypes.SetAuthRedirectPath);
    default: return state;
  }
}

export default reducer;