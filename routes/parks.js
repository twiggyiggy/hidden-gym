'use strict';

const express = require('express');
const router = express.Router();
const Park = require('../models/Park');

/* GET users listing. */
router.get('/', (req, res, next) => {
  // how to connect to hbs
  res.render('parksList');
});

router.get('/create', (req, res, next) => {
  res.render('createPark');
});

module.exports = router;
