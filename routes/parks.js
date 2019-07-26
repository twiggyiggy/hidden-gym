'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  // how to connest to hbs
  res.render('parks');
});

module.exports = router;
