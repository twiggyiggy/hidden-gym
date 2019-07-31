'use strict';

const express = require('express');
const router = express.Router();
const Gym = require('../models/Gym.js');
const parser = require('../config/cloudinary');

// -------------------
/* GET create-gym */
router.get('/create', (req, res, next) => {
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

/* GET gymsList */
router.get('/', async (req, res, next) => {
  const gyms = await Gym.find();
  res.render('gymsList', { gyms });
});

router.post('/:id/details/:answer', async (req, res, next) => {
  try {
    const { id, answer } = req.params;
    const gym = await Gym.findById(id);
    const usersVotes = gym.usersVotes; // a shorthand for the next 3 lines?
    let upvotes = gym.upvotes;
    let averageRating = gym.averageRating;
    const userId = req.session.currentUser._id;
    console.log(userId);
    if (usersVotes.includes(userId)) {
      return res.redirect(`/gyms/${id}/details`);
    } else {
      if (answer === 'yes') {
        upvotes++;
      }
      const newUsersVotes = [...gym.usersVotes, userId];
      console.log(newUsersVotes);
      const gymUpdate = await Gym.findByIdAndUpdate(id, { usersVotes: newUsersVotes }, { new: true });
      console.log(gymUpdate);
      averageRating = Math.round(upvotes / newUsersVotes.length * 100);
      await Gym.findByIdAndUpdate(id, { upvotes, averageRating }); // object destructuring or type casting?
    }
    res.redirect(`/gyms/${id}/details`);
  } catch (error) {
    next(error);
  }
});

// await User.findByIdAndUpdate(userId, { $push: { recipes: recipeId } });

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
