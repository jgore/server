const express = require('express');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')

const app = express();

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken) => {
  console.log(accessToken)
}))

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google') )

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0")