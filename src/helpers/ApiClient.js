import fetch from 'isomorphic-fetch';

export default class clientAPI {
  constructor() {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  get(url, params) {
    return fetch(url, {
      method: 'GET',
      headers: this.headers
    });
  }

  post(url, params) {
    console.info(url);
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(params.data)
    });
  }
}