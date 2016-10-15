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
 *  isLoading: true | false, <-- LOAD.
 *  isLoaded: true | false,
 *  loadError: { error object } | null
 *  user: { user object }
 *
 *  isSigningIn: true | false, <-- SIGN IN.
 *  signInError: { error object } | null
 *  user: { user object} | null
 *
 *  isSigningOut: true | false, <-- SIGN OUT.
 *  signOutError: { error object } | null
 *  user: { user object }
 * }
 */

const initialState = {
  isLoading: true
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        loadError: action.error
      };
    case SIGNIN:
      return {
        ...state,
        isSigningIn: true
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
        signInError: null,
        user: action.result
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        isSigningIn: false,
        signInError: action.error
      };
    case SIGNOUT:
      return {
        ...state,
        isSigningOut: true
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        isSigningOut: false,
        signOutError: null,
        user: null
      };
    case SIGNOUT_FAIL:
      return {
        ...state,
        isSigningOut: false,
        signOutError: action.error
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/users/whoami'),
  };
}

export function signin(email, password) {
  return {
    types: [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAIL],
    promise: (client) => client.post('/api/auth/signin', {
      data: {
        email,
        password
      }
    }),
  };
}

export function signout() {
  return {
    types: [SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_SUCCESS],
    promise: (client) => client.get('/api/auth/signout'),
  };
}