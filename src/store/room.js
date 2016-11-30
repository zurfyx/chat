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

      // Note: multiple connections from the same client have the same socket.id,
      // hence it's possible that we get 2+ room removals from the same socket.
      // There's no clear need that we need that we need to keep track of these
      // different connections (since we are only expecting the client to make a
      // connection at a time, and reconnect only if the previous connection
      // crashed), but we have to ensure that the app won't crash if that is the
      // case.
      // https://github.com/socketio/socket.io/issues/430#issuecomment-13875222

      // If there is no populated room, we assume all members already left, and
      // the current one is simply one of these repeated connections (which is
      // no longer in the room because at least one of their other clones left).
      if (state[roomId]) {
        // If the socket is not found in this room it is totally fine. Just no
        // removal will be done (same case as above, but this time there's at
        // least someone connected).
        state[roomId].delete(socket);

        if (state[roomId].size === 0) {
          // There's no-one else in this room, let's remove the empty Set()
          // object, to avoid wasting unnecessary memory.
          state[roomId].delete(socket);
        }
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