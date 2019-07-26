'use strict';
// requires de paquetes
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

// requires de archivos
const saltRounds = 10;
const router = express.Router();

/*  --- --- --- --- --- --- 5 routas principales --- --- --- --- --- --- */
// SIGNUP --- --- --- --- --- ---
router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    req.session.currentUser = newUser;

    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

// LOGIN --- --- --- --- --- ---
router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});
// LOGOUT  --- --- --- --- --- ---
router.post('/logout', (req, res, next) => {
  if (req.session.currentUser) {
    delete req.session.currentUser; // if curentUser exists, delete their key, redirect to login // if currentUser doesnt exist, res.redirect to homepage
    return res.redirect('/auth/login');
  }
  res.redirect('/');
});

module.exports = router;
