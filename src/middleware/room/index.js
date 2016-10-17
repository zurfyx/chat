import Room from '~/models/Room';

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