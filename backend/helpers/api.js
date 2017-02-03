/* eslint-disable import/prefer-default-export */

export class ApiError {
  constructor(message, status = 500) {
    this.message = message;
    this.status = status;
  }
}
