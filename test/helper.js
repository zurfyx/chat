import mongoose from 'mongoose';
import request from 'superagent';

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

// Teardown
after(() => {
  // Drop the test databases. TODO. Clear Redis one.
  mongoose.connection.db.dropDatabase();
});