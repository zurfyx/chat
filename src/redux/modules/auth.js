const LOAD = 'redux/auth/LOAD';
const LOAD_SUCCESS = 'redux/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/auth/LOAD_FAIL';
const LOGIN = 'redux/auth/LOGIN';
const LOGIN_SUCCESS = 'redux/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux/auth/LOGIN_FAIL';
const LOGOUT = 'redux/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux/auth/LOGOUT_FAIL';

/**
 * Reducer overview:
 * {
 *  loading: true | false, <-- LOAD.
 *  loaded: true | false,
 *  loadError: { error object } | null
 *  user: { user object }
 *
 *  loggingIn: true | false, <-- LOGGING IN.
 *  logInError: { error object } | null
 *  user: { user object} | null
 *
 *  loggingOut: true | false, <-- LOGGING OUT.
 *  logOutError: { error object } | null
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
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        logInError: null,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        logOutError: null,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logOutError: action.error
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

export function login(email, password) {
  return {
    types: [ LOGIN, LOGIN_SUCCESS, LOGIN_FAIL ],
    promise: (client) => client.post('/api/auth/signin', {
      data: {
        email,
        password
      }
    })
  };
}

export function logout() {
  return {
    types: [ LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL ],
    promise: (client) => client.get('/api/auth/logout')
  };
}