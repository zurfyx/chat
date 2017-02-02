import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import Session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import Socketio from 'socket.io';
import config from 'config';

import { info, error } from './helpers/log';
import initializeMongodb from './databases/mongodb';
import initializeRedis from './databases/redis';
import routes from './routes';
import socketConnectionHandler from './sockets';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3030;

// Hey you! care about my order http://stackoverflow.com/a/16781554/2034015

// Databases.
initializeMongodb();
const dbSession = initializeRedis(Session);

// Cookies.
app.use(cookieParser());

// Body.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator({
  customValidators: {
    isSlug: function (input) {
      if (typeof input !== 'string' ||
          input.length < 5 || input.length > 55) return false;

      const re = /^[a-zA-Z0-9_-]+$/;
      return input.match(re);
    }
  }
}));

// Session.
const session = Session({
  resave: true,
  saveUninitialized: true,
  key: config.get('session.key'),
  secret: config.get('session.secret'),
  store: dbSession
});
app.use(session);
app.use((req, res, next) => {
  if (!req.session) {
    error('Session not found (is Redis down?).');
  }
  next();
});

// Passport.
app.use(passport.initialize());
app.use(passport.session());

// Logging (debug only).
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// URLs.
app.use('/', routes);

// Proxy configuration.
if (config.get('proxy')) {
  app.enable('trust proxy');
}

// Socket.IO
const io = Socketio(server);
io.use((socket, next) => {
  session(socket.handshake, {}, next);
});

io.on('connection', socketConnectionHandler);

// Listen.
server.listen(port);
info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');
info(`🌐  API + 🗲 Socket listening on port ${port}`);
info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');

export default server;