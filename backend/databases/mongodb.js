import config from 'config';
import mongoose from 'mongoose';

mongoose.Promise = Promise;

const dbHost = config.get('database.data.host');
const dbPort = config.get('database.data.port');
const dbName = config.get('database.data.db');
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const reconnectTimeout = config.get('database.data.reconnectTimeout');

function connect() {
  mongoose.connect(dbURI, { auto_reconnect: true })
    .catch(() => {});
}

export default function initializeMongodb() {
  const db = mongoose.connection;

  db.on('connecting', () => {
    console.info('Connecting to MongoDB...');
  });

  db.on('error', (error) => {
    console.error(`MongoDB connection error: ${error}`);
    mongoose.disconnect();
  });

  db.on('connected', () => {
    console.info('Connected to MongoDB!');
  });

  db.once('open', () => {
    console.info('MongoDB connection opened!');
  });

  db.on('reconnected', () => {
    console.info('MongoDB reconnected!');
  });

  db.on('disconnected', () => {
    console.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
    setTimeout(() => connect(), reconnectTimeout);
  });

  connect();
}
