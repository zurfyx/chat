import Room from '~/models/Room';

export const rooms = (req, res, next) => {
  Room.find({}, (err, rooms) => {
    if (err) next(err);

    return res.json(rooms);
  });
};

export const getRoom = (req, res, next) => {
  return res.json(req.room);
};

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
    req.slug = req.body.slug;
    req.description = req.body.description;
    newRoom.owner = req.user;
    newRoom.members = [ req.user.id ];

    newRoom.save((err, room) => {
      if (err) return next(err);

      return res.json(room);
    });
  });
};

export const joinRoom = (req, res, next, slug) => {

};

export const leaveRoom = (req, res, next) => {

};