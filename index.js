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
