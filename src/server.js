import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import session from 'express-session';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import { createClient as createRedisClient } from 'redis';
import connectRedis from 'connect-redis';

import config from '../config/config.js';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3030;

// Hey you! care about my order http://stackoverflow.com/a/16781554/2034015

/*
 * Databases initialization.
 */
// Data database (Mongoose + MongoDB).
const dbHost = config.database.data.host;
const dbPort = config.database.data.port;
const dbName = config.database.data.db;
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error!'));

// Session database (Redis).
const redisClient = createRedisClient();
const RedisStore = connectRedis(session);
const dbSession = new RedisStore({
  client: redisClient,
  host: config.database.session.host,
  port: config.database.session.port,
  prefix: config.database.session.prefix,
  disableTTL: true
});

// Cookies.
app.use(cookieParser());

// Body.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator([]));

// Session.
app.use(session({
  resave: true,
  saveUninitialized: true,
  key: config.session.key,
  secret: config.session.secret,
  store: dbSession
}));

// Passport.
app.use(passport.initialize());
app.use(passport.session());

// URLs.
app.use('/', routes);

// Logging (debug only).
app.use(morgan('dev'));

// Listen.
app.listen(port);
console.log('🌐  Listening on port ' + port);