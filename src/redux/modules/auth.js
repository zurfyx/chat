const LOAD = 'redux/auth/LOAD';
const LOAD_SUCCESS = 'redux/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/auth/LOAD_FAIL';

const SIGNIN = 'redux/auth/SIGNIN';
const SIGNIN_SUCCESS = 'redux/auth/SIGNIN_SUCCESS';
const SIGNIN_FAIL = 'redux/auth/SIGNIN_FAIL';

const SIGNUP = 'redux/auth/SIGNUP';
const SIGNUP_SUCCESS = 'redux/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'redux/auth/SIGNUP_FAIL';

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
 *  user: null // Refresh with load() once signed in.
 *
 *  isSigningUp: true | false, <-- SIGN UP.
 *  signUpError: { error object} | null
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
        user: null,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        isSigningIn: false,
        signInError: action.error
      };
    case SIGNUP:
      return {
        ...state,
        isSigningUp: true
      };
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: null
      }
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: action.error
      }
    }
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
        password,
      }
    }),
  };
}

export function signup(email, password, name) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/api/auth/signup', {
      data: {
        email,
        password,
        name,
      }
    }),
  }
}

export function signout() {
  return {
    types: [SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_SUCCESS],
    promise: (client) => client.get('/api/auth/signout'),
  };
}