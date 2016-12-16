import store from '~/store';

/**
 * Sync function that sends content to Room members async.
 */
export function emitToRoom(roomId, emitName, content) {
  const membersList = store.getState().room[roomId];
  if (membersList) {
    membersList.forEach((socket) => {
      setTimeout(() => socket.emit(emitName, content), 0);
    });
  }
  return content;
}