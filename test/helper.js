import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import request from 'superagent';
import { forEach } from 'async-foreach';
import config from 'config';

const PORT = process.env.PORT || 3030;

// Globals.
global.server = `http://localhost:${PORT}`;
global.request = request.agent();

// Setup.
before((done) => {
  mockgoose(mongoose).then(() => {
    // Execute server with the mocked DB.
    require('~/server');
    done();
  });
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
// TODO. Clear Redis database.