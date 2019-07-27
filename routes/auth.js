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
  if (req.session.currentUser) { // route protection: If user is logged-in, won't let him see signup page - redirect him to index instead (should be parks!)
    return res.redirect('/parks'); // if user is logged-in, redirect him back to parks list page
  }
  res.render('signup'); // if user is not logged in, display signup page.
});

router.post('/signup', async (req, res, next) => {
  if (req.session.currentUser) { // route protection: although the user doesn't see a post page, still need to protect the route (adnvanced - smb can use a program to post req.body without even seeing our form)
    return res.redirect('/parks');
  }
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.redirect('/auth/signup');
    }

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
      res.redirect('/parks');
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
    delete req.session.currentUser; // if curentUser exists, delete their key, redirect to login
    return res.redirect('/');
  }
  res.redirect('/'); // if currentUser doesnt exist, res.redirect to homepage
});

module.exports = router;
