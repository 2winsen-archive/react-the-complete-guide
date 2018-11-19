import * as actionTypes from '../actions/actionTypes';
import reducer, { State } from './auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'ANY_ACTION' })).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  });

  it('should return the initial state', () => {
    const state: State = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    };
    const action = { type: actionTypes.AUTH_SUCCESS, idToken: 'some-token', userId: 'some-user-id' }
    expect(reducer(state, action)).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  });
});