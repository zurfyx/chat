const LOAD = 'redux/auth/LOAD';
const LOAD_SUCCESS = 'redux/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/auth/LOAD_FAIL';
const SIGNIN = 'redux/auth/SIGNIN';
const SIGNIN_SUCCESS = 'redux/auth/SIGNIN_SUCCESS';
const SIGNIN_FAIL = 'redux/auth/SIGNIN_FAIL';
const SIGNOUT = 'redux/auth/SIGN_OUT';
const SIGNOUT_SUCCESS = 'redux/auth/SIGNOUT_SUCCESS';
const SIGNOUT_FAIL = 'redux/auth/SIGNOUT_FAIL';

/**
 * Reducer overview:
 * {
 *  loading: true | false, <-- LOAD.
 *  loaded: true | false,
 *  loadError: { error object } | null
 *  user: { user object }
 *
 *  signingIn: true | false, <-- SIGNING IN.
 *  signingInError: { error object } | null
 *  user: { user object} | null
 *
 *  signingOut: true | false, <-- SIGNING OUT.
 *  signingOutError: { error object } | null
 *  user: { user object }
 * }
 */

const initialState = {
  loading: true
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        loadError: action.error
      };
    case SIGNIN:
      return {
        ...state,
        signingIn: true
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        signingIn: false,
        signInError: null,
        user: action.result
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        signingIn: false,
        signInError: action.error
      };
    case SIGNOUT:
      return {
        ...state,
        signingOut: true
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        signingOut: false,
        signOutError: null,
        user: null
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        signingOut: false,
        signOutError: action.error
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
    promise: (client) => client.get('/api/users/whoami')
  };
}

export function signin(email, password) {
  return {
    types: [ SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAIL ],
    promise: (client) => client.post('/api/auth/signin', {
      data: {
        email,
        password
      }
    })
  };
}

export function signout() {
  return {
    types: [ SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_SUCCESS ],
    promise: (client) => client.get('/api/auth/signout')
  };
}