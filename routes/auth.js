'use strict';
// requires de paquetes
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

// requires de archivos
const saltRounds = 10;
const router = express.Router();
/* 5 routas principales. */
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

router.get('/login', (req, res, next) => {
});

router.post('/login', (req, res, next) => {
});

router.post('/logout', (req, res, next) => {
});

module.exports = router;
