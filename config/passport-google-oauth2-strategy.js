const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('../config/environment');
const url = require('url');
const { google } = require('googleapis');

//Setting up google oauth2 strategy on passport
    passport.use(new GoogleStrategy({
      clientID: "828861231482-r0n4268ub9ksraibm8a8k25391vvuue7.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback"
  }, function(accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value })
          .then(user => {
              if (user) {
                  // User exists, log them in
                  console.log('User exists:', user);
                  return done(null, user);
              } else {
                  // User does not exist, create a new user
                  const newUser = new User({
                      name: profile.displayName,
                      email: profile.emails[0].value,
                      password: crypto.randomBytes(20).toString('hex')
                  });
  
                  newUser.save()
                      .then(savedUser => {
                          console.log('New user created:', savedUser);
                          return done(null, savedUser);
                      })
                      .catch(err => {
                          console.log('Error in creating user:', err);
                          return done(err, false);
                      });
              }
          })
          .catch(err => {
              console.log('Error in Google strategy-passport:', err);
              return done(err, false);
          });
  }));
  



module.exports = passport;
