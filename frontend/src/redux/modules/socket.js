const CONNECT = 'redux/socket/CONNECT';
const CONNECT_SUCCESS = 'redux/socket/CONNECT_SUCCESS';
const CONNECT_FAIL = 'redux/socket/CONNECT_FAIL';

const DISCONNECT = 'redux/socket/DISCONNECT';
const DISCONNECT_SUCCESS = 'redux/socket/DISCONNECT_SUCCESS';
const DISCONNECT_FAIL = 'redux/socket/DISCONNECT_FAIL';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        isConnecting: true,
      };
    case CONNECT_SUCCESS:
      return {
        ...state,
        isConnecting: false,
        connectError: null,
      };
    case CONNECT_FAIL:
      return {
        ...state,
        isConnecting: false,
        connectError: action.error,
      };
    case DISCONNECT:
      return {
        ...state,
        isDisconnecting: true,
      };
    case DISCONNECT_SUCCESS:
      return {
        ...state,
        isDisconnecting: true,
        disconnectError: null,
      };
    case DISCONNECT_FAIL:
      return {
        ...state,
        isDisconnecting: false,
        disconnectError: action.error,
      };
    default:
      return state;
  }
}

export function connect() {
  return {
    type: 'socket',
    types: [CONNECT, CONNECT_SUCCESS, CONNECT_FAIL],
    promise: (socket) => socket.connect(),
  };
}

export function disconnect() {
  return {
    type: 'socket',
    types: [DISCONNECT, DISCONNECT_SUCCESS, DISCONNECT_FAIL],
    promise: (socket) => socket.disconnect(),
  }
}