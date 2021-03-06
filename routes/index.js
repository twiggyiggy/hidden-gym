'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/gyms');
  }
  res.render('index');
});

module.exports = router;
