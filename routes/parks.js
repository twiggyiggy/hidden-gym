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
// -------------------
/* GET parksList */
router.get('/', async (req, res, next) => {
  const parks = await Park.find();
  res.render('parksList', { parks });
});

// -------------------
/* Get parksList Details */
router.get('/:id/details', async (req, res, next) => {
  try {
    const id = req.params.id;
    const park = await Park.findById(id);
    res.render('parksList', park);
  } catch (error) {
    next(error);
  }
});
/* GET createPark */
router.get('/:id/details/create', async (req, res, next) => {
  try {
    const id = req.params.id;
    const park = await Park.findById(id);
    res.render('createPark', park);
  } catch (error) {
    next(error);
  }
});
/* POST createPark */
router.post('/:id/details/create', async (req, res, next) => {
  try {
    const id = req.params.id;
    const park = req.body;
    await Park.findByIdAndUpdate(id, park);
    res.redirect(`/parks/${id}/details`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
// ---------------------

// router.get('/create', (req, res, next) => {
//   res.render('recipesCreate');
// });

// router.post('/create', async (req, res, next) => {
//   try {
//     const recipe = req.body;
//     await Recipe.create(recipe);
//     res.redirect('/recipes');
//   } catch (error) {
//     next(error);
//   }
// });

// // router.get('/search', async (req, res, next) => {
// //   try {
// //     const title = req.query.title;
// //     const recipe = await Recipe.findOne({ title });
// //     res.render('recipeDetails', recipe);
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// router.get('/details/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const recipe = await Recipe.findById(id);
//     res.render('recipeDetails', recipe);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/details/:id/edit', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const recipe = await Recipe.findById(id);
//     res.render('recipeUpdate', recipe);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/details/:id/edit', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const recipe = req.body;
//     await Recipe.findByIdAndUpdate(id, recipe);
//     res.redirect(`/recipes/details/${id}`);
//   } catch (error) {
//     next(error);
//   }
// });
