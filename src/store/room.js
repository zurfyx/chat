const ADD_SOCKET_TO_ROOM = 'redux/room/ENTER_ROOM';
const REMOVE_SOCKET_FROM_ROOM = 'redux/room/REMOVE_SOCKET_FROM_ROOM';

/**
 * Overview:
 * {
 *  roomId: Set([socket, ...])
 * }
 */

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ADD_SOCKET_TO_ROOM: {
      const { roomId, socket } = action;
      if (!state[roomId]) {
        // This socket is the first one in the room. Let's create a new Set
        // for them.
        state[roomId] = new Set();
      }
      state[roomId].add(socket);
      return { ...state };
    }
    case REMOVE_SOCKET_FROM_ROOM: {
      const { roomId, socket } = action;
      if (state[roomId].size === 1) {
        // This socket is the last one in the room. There is no need to keep
        // the Set in memory anymore.
        delete state[roomId];
      } else {
        state[roomId].delete(socket);
      }
      return { ...state };
    }
    default: {
      return state;
    }
  }
}

export function addSocketToRoom(roomId, socket) {
  return {
    type: ADD_SOCKET_TO_ROOM,
    roomId,
    socket,
  }
}

export function removeSocketFromRoom(roomId, socket) {
  return {
    type: REMOVE_SOCKET_FROM_ROOM,
    roomId,
    socket,
  }
}