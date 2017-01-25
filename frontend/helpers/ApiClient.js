import fetch from 'isomorphic-fetch';

// TODO Move me elsewhere!
const host = 'http://localhost:3000';

export default class clientAPI {
  constructor() {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  get(url, params) {
    const fullUrl = new URL(host + url);

    // Optional query parameters.
    if (params) {
      Object.keys(params).forEach(key => fullUrl.searchParams.append(key, params[key]));
    }

    return fetch(fullUrl, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    });
  }

  post(url, params) {
    return fetch(host + url, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(params.data)
    });
  }
}