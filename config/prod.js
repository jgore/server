
//@FIXME @pszczepkowski .. fix on production google env variable
module.exports = {
  googleClientID: '658775791640-vqaulc0advuc5bm17iefhqj1m4b90tek.apps.googleusercontent.com',
  googleClientSecret: 'BcZGo3FPq_LrVzN65xVxVt5k',
  cookieKey: process.env.COOKIE_KEY,
  mongoURI: process.env.MONGO_URI,
}