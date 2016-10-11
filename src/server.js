import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import session from 'express-session';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';

import config from '../config/config.js';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3030;

// Hey you! care about my order http://stackoverflow.com/a/16781554/2034015
// DB.
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error!'));

// Cookies.
app.use(cookieParser());

// Body.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator([]));

// Session.
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
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