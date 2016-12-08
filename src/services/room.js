import Room from '~/models/Room';

/**
 * Given a room identifier string, return its object.
 */
export function findRoom(roomId) {
  return Room.findOne({ _id: roomId }).exec().then((room) => {
    if (!room) throw 'No room matched the given roomId';

    return room;
  });
}

export function findRoomBySlug(slug) {
  // TODO: slug validator
  return Room.findOne({ slug }).exec().then((room) => {
    if (!room) throw 'No room matched the given slug';

    return room;
  });
}

/**
 * Given an existing userId, it will return the rooms they have joined.
 */
export function findJoinedRoomsByUser(userId) {
  return Room.find({ members: userId }).exec();
}

/**
 * Given an existing userId, it will return the rooms they own.
 */
export function findOwnedRoomsByUser(userId) {
  return Room.find({ owner: userId }).exec();
}