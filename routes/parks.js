'use strict';

const express = require('express');
const router = express.Router();
const Park = require('../models/Park');

/* GET create-park */
router.get('/create', (req, res, next) => {
  // console.log('this is the router to create a park!');
  res.render('createPark');
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  // console.log('this is the router to park list!');
  res.render('parksList');
});

module.exports = router;
