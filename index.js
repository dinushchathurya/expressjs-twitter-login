'use strict';

require('dotenv').config();
const path = require('path')
const express = require('express')
const passport = require('passport')
const { Strategy } = require('passport-twitter')
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, SESSION_SECRET } = process.env;
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes');

// configure the Twitter strategy for use by Passport.
passport.use(new Strategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: '/return'
    },
    (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile);
}));

// configure Passport authenticated session persistence.
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

// tempalte engine
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));

// session handling
app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));

// initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());