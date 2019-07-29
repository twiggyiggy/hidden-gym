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
    return res.redirect('/gyms');
  }
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/gyms');
  }
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.redirect('/auth/signup');
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.redirect('/auth/signup');
    }
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

// LOGIN --- --- --- --- --- ---
router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/gyms');
  }
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/gyms');
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect('/auth/login');
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/auth/login');
    }
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

// LOGOUT  --- --- --- --- --- ---
router.post('/logout', (req, res, next) => {
  if (req.session.currentUser) {
    delete req.session.currentUser;
    return res.redirect('/');
  }
  res.redirect('/');
});

module.exports = router;
