'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gymSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  upvotes: {
    type: Number,
    required: false,
    unique: false
  },
  totalVotes: {
    type: Number,
    required: false,
    unique: false
  },
  averageRating: {
    type: Number, // calculateAverageRating();
    required: false,
    unique: false
  },
  imageUrl: {
    type: String,
    required: true,
    unique: false
  },
  additionalInfo: {
    type: String,
    required: false,
    unique: false
  },
  creator: {
    type: String,
    required: false,
    unique: false
  }
}, {
  timestamps: true
});

const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;
