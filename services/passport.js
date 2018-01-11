const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err));
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then((user) => {
            if (user){
                done(null, user);
            } else {
                // No user with this ID exists, create a new one
                new User({ googleId: profile.id }).save()
                    .then((user) => done(null, user));
            }
        });


    }
));

module.exports = passport;