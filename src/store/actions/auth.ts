import * as actionTypes from './actionTypes';

export const authSuccess = (idToken: string, userId: string) => ({
  type: actionTypes.AUTH_SUCCESS,
  userId,
  idToken
});

export const authFail = (error: string) => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const checkAuthTimeout = (expirationTime: number): actionTypes.AuthCheckTimeout => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime
});

export const logout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT
});

export const auth = (email: string, password: string, isSignup: boolean): actionTypes.AuthUser => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignup
});

export const setAuthRedirectPath = (path: string) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_STATE
});