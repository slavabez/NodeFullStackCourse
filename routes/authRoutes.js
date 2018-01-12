const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    // Register new user
    app.post('/auth/email/register', async (req, res) => {
        const {full_name, email, pass_1, pass_2} = req.body;
        // Check if a user with such email already exists
        const user = await User.findOne({email: email});
        if (user) {
            return res.status(409).send({message: 'User with such email already exists'});
        }
        // Compare passwords
        if (pass_1 !== pass_2) {
            return res.status(400).send({ message: 'Passwords have to match' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pass_1, salt);
        const newUser = await new User({
            authType: 'email',
            email: email,
            password: hashedPass,
            fullName: full_name,
            nickName: full_name.toLowerCase().replace(' ','_')
        }).save();
        return res.send(newUser);
    });

    app.post(
        '/auth/email/login',
        passport.authenticate('local', {
            successRedirect: '/auth/email/success',
            failureRedirect: '/auth/email/failure'
        })
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send({});
    });

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.status(401);
            res.send({});
        }
    });
};

