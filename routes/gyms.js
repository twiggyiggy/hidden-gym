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
  // lines 31-37 can go, only want to ask Jack about them!
  // const defaultImageUrl = 'https://res.cloudinary.com/dygs6mymv/image/upload/v1564402920/Hidden%20Gym/calisthenics-park1_pn1gcy.jpg';
  // let image = req.file.secure_url || defaultImageUrl;
  // image = defaultImageUrl && req.file.secure_url;
  // let imageDefault;
  let image;
  if (req.file !== undefined) {
    image = req.file.secure_url;
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

router.post('/:id/details/:answer', async (req, res, next) => {
  // refactor two lines below to use object destructuring
  try {
    const id = req.params.id;
    const answer = req.params.answer;
    const gym = await Gym.findById(id);
    let totalVotes = gym.totalVotes;
    let upvotes = gym.upvotes;
    let averageRating = gym.averageRating;
    if (answer === 'yes') {
      upvotes++;
      totalVotes++;
    } else {
      totalVotes++;
    }
    averageRating = upvotes / totalVotes;
    await Gym.findByIdAndUpdate(id, { totalVotes, upvotes, averageRating }); // object destructuring?
    res.redirect(`/gyms/${id}/details`);
  } catch (error) {
    next(error);
  }
});

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
