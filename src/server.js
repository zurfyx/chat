import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';

import config from '../config/config.js';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3030;

// hey you! care about my order http://stackoverflow.com/a/16781554/2034015
// db
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error!'));

// cookies
app.use(cookieParser());

// body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// session
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// urls
app.use('/', routes);

// logging (debug only)
app.use(morgan('dev'));

// listen
app.listen(port);
console.log('🌐  Listening on port ' + port);