module.exports = {
  // Databases.
  database: {
    // MongoDB.
    data: {
      host: 'mongo',
      port: 27017,
      db: 'nyao',
      reconnectTimeout: 5000, // ms.
    },
    // Redis.
    session: {
      host: 'redis',
      port: 6379,
      prefix: 'nyao_',
    },
  },

  // Passport (OAuth & local login).
  passport: {
    github: {
      clientID: '???',
      clientSecret: '???',
      callbackURL: 'http://localhost:3000/api/auth/github/callback',
    },
    google: {
      clientID: '???',
      clientSecret: '???',
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
  },

  // Running behind a proxy?
  proxy: false,
  host: `localhost:${process.env.PORT}`, // How can others (inc. external peers) reach you?
                                         // i.e. https://example.com/api

  // Session cookie.
  session: {
    key: 'SID',
    secret: 'luke skywalker',
  },

  /**
   * Config below shouldn't need to be modified.
   */
  githubIpRange: '192.30.252.0/22',
}