export default {
  // facebook: {
  //   clientID: process.env.FACEBOOK_CLIENT_ID,
  //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  //   callbackURL: process.env.FACEBOOK_CALLBACK_URL // host + /auth/facebook/callback
  // },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL // host + /auth/github/callback
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL // host + /auth/google/callback
  }
}