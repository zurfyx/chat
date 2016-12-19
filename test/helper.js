import mongoose from 'mongoose';
import request from 'superagent';
import { forEach } from 'async-foreach';

import config from '../config/config';

const PORT = process.env.PORT || 3030;

// Globals.
global.server = `http://localhost:${PORT}`;
global.request = request.agent();

// Setup.
before(() => {
  // Switch to test databases
  config.database.data.db += '-test';
  config.database.session.prefix += '-test';

  // Run the server with these new configs.
  require('~/server');
});

beforeEach((done) => {
  // Empty models, so that we start from 0 in each test.
  const connection = mongoose.connection;
  forEach(Object.keys(connection.models), function(collection) {
    const done = this.async();
    connection.models[collection].remove({}).then(() => done());
  }, () => done());
});

// Teardown
after(() => {
  // Drop the test databases. TODO. Clear Redis one.
  mongoose.connection.db.dropDatabase();
});