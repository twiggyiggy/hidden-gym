'use strict';

const express = require('express');
const router = express.Router();
const Park = require('../models/Park');

/* GET create-park */
router.get('/create', (req, res, next) => {
  // console.log('this is the router to create a park!');
  res.render('createPark');
});

router.post('/create', async (req, res, next) => {
  const { address, imageUrl, additionalInformation } = req.body;
  try {
    const park = await Park.create({
      address,
      imageUrl,
      additionalInformation
    });
  } catch (error) {
    next(error);
  }
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  // console.log('this is the router to park list!');
  res.render('parksList');
});

module.exports = router;
