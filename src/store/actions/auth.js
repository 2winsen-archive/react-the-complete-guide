import * as actionTypes from './actionTypes';

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const checkAuthTimeout = (expirationTime) => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime
});

export const logout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT
});

export const auth = (email, password, isSignup) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignup
});

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate >= new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        const diff = expirationDate.getTime() - new Date().getTime();
        dispatch(checkAuthTimeout(diff / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
};