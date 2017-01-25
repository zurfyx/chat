import Room from '~/models/Room';

// Check if room id exists on the database.
export const isRoomIdValid = (req, res, next) => {
  Room.findOne({ _id: req.params._id }, (err, room) => {
    if (err) return res.status(500).json({ error: err });

    if (!room) {
      return res.status(500).json({ error: { message: 'Room not found.' } });
    }

    req.room = room;
    next();
  });
};

// Check if slug room name exists on the database.
export const isRoomSlugValid = (req, res, next) => {
  Room.findOne({ slug: req.params.slug}, (err, room) => {
    if (err) return res.status(500).json({ error: err });

    if (!room) {
      return res.status(500).json({ error: { message: 'Room not found.' } });
    }

    req.room = room;
    next();
  });
};

// Check if current signed in user is the owner of the room.
export const isRoomOwner = (req, res, next) => {
  const _id = req.params._id;
  const user = req.user;

  Room.findOne({ _id, owner: user }, (err, room) => {
    if (err) return res.status(500).json({ error: err });

    if (!room) {
      // Either the room does not exist or the user is not its owner.
      const message = 'You are not the room owner.';
      return res.status(500).json({ error: { message } });
    }

    req.room = room;
    next();
  });
};