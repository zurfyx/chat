import Room from '~/models/Room';
import { findUser } from '~/services/user';
import { findJoinedRoomsByUser, findRoomBySlug } from '~/services/room';

// Returns the rooms that an user has joined.
export const findJoinedByUser = (userId) => {
  return findUser(userId)
    .then(() => findJoinedRoomsByUser(userId));
};

// Returns the rooms that an user owns.
export const ownedRooms = (userId) => { // TODO: fix
  return findUser(userId)
    .then(() => findJoinedRoomsByUser(userId));
};

// Returns the room that matches the slug.
export const findBySlug = (slug) => {
  return findRoomBySlug(slug);
};

// Returns all available rooms.
export const rooms = (req, res, next) => {
  Room.find({}, (err, rooms) => {
    if (err) next(err);

    return res.json(rooms);
  });
};

// Creates a new room.
export const createRoom = (req, res, next) => {
  req.checkBody('title', 'Title cannot be blank').notEmpty();
  req.checkBody('slug', 'Slug is invalid').isSlug();
  req.sanitize('title').trim();
  req.sanitize('slug');
  req.sanitize('description').trim();

  const errors = req.validationErrors();
  if (errors) {
    return next(errors);
  }

  Room.findOne({ slug: req.body.slug }, (err, existingRoom) => {
    if (err) return next(err);

    if (existingRoom) {
      return next({ message: 'There is already a room with this slug name.' });
    }

    const newRoom = new Room();
    newRoom.title = req.body.title;
    newRoom.slug = req.body.slug;
    newRoom.description = req.body.description;
    newRoom.owner = req.user;
    newRoom.members = [ req.user.id ];

    newRoom.save((err, room) => {
      if (err) return next(err);

      return res.json(room);
    });
  });
};

/**
 * Searches room(s) by any parameter.
 * Supported parameters: _id, slug
 */
export const searchRooms = (req, res, next) => {
  const filter = {};

  if (req.query._id) filter['_id'] = req.query._id;
  if (req.query.slug) filter['slug'] = req.query.slug;

  Room.find(filter, (err, rooms) => {
    if (err) next(err);

    return res.json(rooms);
  });
};

// Returns a room.
export const getRoom = (req, res, next) => {
  const room = req.room;

  return res.json(room);
};

// Edits a room.
export const editRoom = (req, res, next) => {
  const room = req.room;

  throw new Error('#TODO'); // TODO
};

export const joinRoom = (req, res, next) => {
  const room = req.room;
  const userIsARoomMember = room.members.indexOf(req.user);

  if (userIsARoomMember) {
    return res.json({ message: 'OK' });
  }

  room.members.push(req.user);
  room.save((err, newRoom) => {
    if (err) next(err);

    return res.json({ message: 'OK' });
  });
};

export const leaveRoom = (req, res, next) => {
  const room = req.room;
  const newRoom = room.members.filter((member) => member !== req.user);

  newRoom.save((err, room) => {
    if (err) next(err);

    return res.json({ message: 'OK' });
  });
};

export const deleteRoom = (req, res, next) => {
  const room = req.room;

  throw new Error('#TODO'); // TODO
};