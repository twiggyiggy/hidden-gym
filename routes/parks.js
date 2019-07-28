'use strict';

const express = require('express');
const router = express.Router();
const Park = require('../models/Park.js');
// -------------------
/* GET create-park */
router.get('/create', (req, res, next) => {
  // console.log('this is the router to create a park!');
  res.render('createPark');
});

// -------------------
/* POST  create-park */
router.post('/create', async (req, res, next) => {
  const { address, imageUrl, additionalInfo } = req.body;
  try {
    const park = await Park.create({
      address,
      imageUrl,
      additionalInfo
    });
    res.redirect('/parks');
  } catch (error) {
    next(error);
  }
});
// -------------------
/* GET parksList */
router.get('/', async (req, res, next) => {
  const parks = await Park.find();
  res.render('parksList', { parks });
});

// -------------------
/* Get park Details */
router.get('/:id/details', async (req, res, next) => {
  try {
    const id = req.params.id;
    const park = await Park.findById(id);
    res.render('parkDetails', park);
  } catch (error) {
    next(error);
  }
});

// /* GET update park */
// router.get('/:id/details/edit', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const park = await Park.findById(id);
//     res.render('createPark', park);
//   } catch (error) {
//     next(error);
//   }
// });
// /* POST update park */
// router.post('/:id/details/edit', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const park = req.body;
//     await Park.findByIdAndUpdate(id, park);
//     res.redirect(`/parks/${id}/details`);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
