import io from 'socket.io-client';

// TODO Move me elsewhere!
const host = 'http://localhost:3000';
const socketPath = '/api/socket.io';

export default class socketAPI {
  socket;

  connect() {
    this.socket = io.connect(host, { path: socketPath });
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', (error) => reject(error));
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      return this.socket.emit(event, data, (response) => {
        if (response.error) return reject();

        return resolve();
      });
    });
  }

  on(event, fun) {
    // No promise is needed here, but let's be consistent.
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.on(event, fun);
      resolve();
    });
  }
}