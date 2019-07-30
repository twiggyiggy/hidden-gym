'use strict';
const User = require('../models/User');

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/gyms');
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isFormFilled = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect(req.path);
  }
  next();
};

const isRegistered = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) { // isRegistered?
    return res.redirect('/auth/signup');
  }
  next();
};

const isNotRegistered = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) { // isNotRegistered
    return res.redirect('/auth/login');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isFormFilled,
  isRegistered,
  isNotRegistered
};
