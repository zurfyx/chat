# Nyao - the open-source chat application for developers

## Getting started

Requirements:

- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io)

```
npm install
```

Run the project (see [Execution](#execution) for alternative options):

```
npm start
```

## Execution

Default (production):

`npm start`

Production (backend only):

`npm run start-prod-backend`

Production (frontend only):

`npm run start-prod-frontend`

Development:

`npm run start-dev`

Development (backend only):

`npm run start-dev-backend`

Production (frontend only):

`npm run start-dev-frontend`

## Configuration

The default configuration file resides in `config/default.js`.
You can create your own configuration files that extend it that suit your own needs
(configuration files are based on [config](https://github.com/lorenwest/node-config)).

To start, you should be creating a `config/production.js` or `config/development.js`, for
development or production respectively, that looks like the following:

```
module.exports = {
  passport: {
    github: {
      clientID: 'Github client ID',
      clientSecret: 'GitHub secret key',
      callbackURL: 'http://mydomain:3000/api/auth/github/callback',
    },
    google: {
      clientID: 'Google client ID',
      clientSecret: 'Google secret key',
      callbackURL: 'http://mydomain:3000/api/auth/google/callback',
    },
  },
}
```

### Configuration options

**Database**

*coming soon*

**OAuth authentication**

*coming soon*

**Host**

*coming soon*

**Session**

*coming soon*

**Whitelists**

*coming soon*

## Development

### Folder structure

```
.
├── backend
├── config
├── data
|    ├── db-data
|    └── db-session
├── docs
├── frontend
├── public
├── scripts
├── webpack
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .package.json
├── .travis.yml
└── README.md
```