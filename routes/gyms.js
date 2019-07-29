'use strict';

const express = require('express');
const router = express.Router();
const Gym = require('../models/Gym.js');
const parser = require('../config/cloudinary');

// -------------------
/* GET create-gym */
router.get('/create', (req, res, next) => {
  // console.log('this is the router to create a gym!');
  res.render('createGym');
});

// -------------------
/* POST delete gym */
router.post('/:id/details/delete', async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('hello');
    await Gym.findByIdAndDelete(id);
    res.redirect('/gyms');
  } catch (error) {
    next(error);
  }
});
/* POST  create-gym */
router.post('/create', parser.single('photo'), async (req, res, next) => {
  const { address, imageUrl, additionalInfo, equipmentAvailable } = req.body;
  const image = req.file.secure_url;
  try {
    const gym = await Gym.create({
      address,
      image,
      additionalInfo,
      equipmentAvailable
    });
    res.redirect('/gyms');
  } catch (error) {
    next(error);
  }
});
// -------------------
/* GET gymsList */
router.get('/', async (req, res, next) => {
  const gyms = await Gym.find();
  res.render('gymsList', { gyms });
});

// -------------------
/* Get gym Details */
router.get('/:id/details', async (req, res, next) => {
  try {
    const id = req.params.id;
    const gym = await Gym.findById(id);
    res.render('gymDetails', gym);
  } catch (error) {
    next(error);
  }
});
/* GET edit gym */
router.get('/:id/details/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const gym = await Gym.findById(id);
    res.render('updateGym', gym);
  } catch (error) {
    next(error);
  }
});
/* POST update gym */
router.post('/:id/details/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const gym = req.body;
    await Gym.findByIdAndUpdate(id, gym);
    res.redirect(`/gyms/${id}/details`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
