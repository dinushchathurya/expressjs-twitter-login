'use strict';

require('dotenv').config();
const path = require('path')
const express = require('express')
const passport = require('passport')
const { Strategy } = require('passport-twitter')