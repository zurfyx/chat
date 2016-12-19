import Room from '~/models/Room';

describe('Room', () => {

});

export function createRoom(owner) {
  const room = new Room();
  room.title = 'sample';
  room.slug = 'sample';
  room.owner = owner;
  return room.save();
}