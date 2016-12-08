import { Mongoose } from 'mongoose';
import mockgoose from 'mockgoose';
import chai from 'chai';
import chaiHttp from 'chai-http';

import config from '../config/config';

const PORT = process.env.PORT || 3030;

chai.use(chaiHttp);

const mongoose = new Mongoose();
mongoose.Promise = global.Promise;

// Globals.
global.server = `http://localhost:${PORT}`;
global.mockdb = mockgoose(mongoose);

// Setup.
before((done) => {
  mockdb.then(() => {
    const { host, port, db } = config.database.data;
    console.info(`mongodb://${host}:${port}/${db}`);
    mongoose.connect(`mongodb://${host}:${port}/${db}`, (err) => {
      if (err) console.error (err);
      done(err);
    });
  });
});