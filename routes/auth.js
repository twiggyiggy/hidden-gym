'use strict';
// requires de paquetes
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { isLoggedIn, isNotLoggedIn, isFormFilled, isRegistered, isNotRegistered } = require('../middlewares/authMiddlewares');

// requires de archivos
const saltRounds = 10;
const router = express.Router();

// SIGNUP
router.get('/signup', isLoggedIn, (req, res, next) => {
  res.render('signup');
});

router.post('/signup', isLoggedIn, isFormFilled, isRegistered, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      username,
      password: hashedPassword
    });
    req.session.currentUser = newUser;
    res.redirect('/gyms');
  } catch (error) {
    next(error);
  }
});

// LOGIN
router.get('/login', isLoggedIn, (req, res, next) => {
  res.render('login');
});

router.post('/login', isLoggedIn, isFormFilled, isNotRegistered, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/gyms');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

// LOGOUT
router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser;
  return res.redirect('/');
});

module.exports = router;
