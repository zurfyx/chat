const CONNECT = 'redux/socket/CONNECT';
const DISCONNECT = 'redux/socket/DISCONNECT';

/**
 * Overview:
 * {
 *  connected: Set([socketId, ...]),
 *  userSocket: { userId: socketId },
 * }
 */

const initialState = {
  connected: new Set(),
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CONNECT:
      state.connected.add(action.socketId);
      if (action.userId) state.userSocket[action.socketId] = action.userId;
      return { ...state };
    case DISCONNECT:
      state.connected.delete(action.socketId);
      if (action.userId) delete state.userSocket[action.socketId];
      return { ...state };
    default:
      return state;
  }
}

/**
 * Anonymous users will have their userId as undefined
 */
export function connect(socketId, userId) {
  return {
    type: CONNECT,
    socketId,
    userId,
  }
}

export function disconnect(socketId, userId) {
  return {
    type: DISCONNECT,
    socketId,
    userId,
  }
}