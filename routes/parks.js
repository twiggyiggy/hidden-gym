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

router.get('/', async (req, res, next) => {
  const parks = await Park.find();
  res.render('parksList', { parks });
});

router.get('/:id/details', async (req, res, next) => {
  try {
    const id = req.params.id;
    const park = await Park.findById(id);
    res.render('parksList', park);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
