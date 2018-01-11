const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send({});
    });

    app.get('/api/current_user', (req, res) => {
        if (req.user){
            res.send(req.user);
        } else {
            res.status(401);
            res.send({});
        }
    });
};

