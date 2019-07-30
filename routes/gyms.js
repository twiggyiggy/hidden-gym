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
  const { address, additionalInfo, equipmentAvailable } = req.body;
  let image = req.file.secure_url || 'https://res.cloudinary.com/dygs6mymv/image/upload/v1564402920/Hidden%20Gym/calisthenics-park1_pn1gcy.jpg';
  // lines 31-39 to be refactored
  // let image = defultURL && req.file.secure_url;
  // let image = req.file.secure_url || 'https://res.cloudinary.com/dygs6mymv/image/upload/v1564402920/Hidden%20Gym/calisthenics-park1_pn1gcy.jpg';
  if (req.file.secure_url) {
    image = req.file.secure_url;
  } else {
    image = 'https://res.cloudinary.com/dygs6mymv/image/upload/v1564402920/Hidden%20Gym/calisthenics-park1_pn1gcy.jpg';
  }

  try {
    await Gym.create({
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
router.post('/:id/details/edit', parser.single('photo'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const gym = req.body;
    let image;

    if (req.file) {
      image = req.file.secure_url;
    } else {
      const gym = await Gym.findById(id);
      image = gym.image;
    }

    gym.image = image;
    await Gym.findByIdAndUpdate(id, gym);
    res.redirect(`/gyms/${id}/details`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
