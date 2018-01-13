const passport = require('passport');
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
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
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({googleId: profile.id});
        if (user) {
            return done(null, user);
        }
        const newUser = await new User({
            googleId: profile.id,
            fullName: profile.displayName,
            email: (profile.emails[0].value) ? profile.emails[0].value : '',
            authType: 'google',
            nickName: profile.displayName.toLowerCase().replace(' ','_')
        }).save();
        done(null, newUser);
    }
));

passport.use(new LocalStrategy(
    async (email, password, done) => {
        try {
            const user = await User.findOne({email});
            if (!user) {
                return done(null, false, { message: 'No users with such email' })
            }
            const correctPass = await verifyPassword(password, user);
            if (!correctPass){
                return done(null, false, { message: 'Incorrect password' })
            } else {
                return done(null, user);
            }
        } catch (err) {
            console.warn(err);
            return done(err);
        }
    }
));

 const verifyPassword = async (password, user) => {
     return await bcrypt.compare(password, user.password);
};

module.exports = passport;