const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
const { mongoURI, cookieKey } = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connection.openUri(mongoURI)
    .on('error', (error) => {
        console.warn('Warning: ', error)
    });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


// Setting up Auth routes for google
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log(`Application listening on port ${PORT}`);