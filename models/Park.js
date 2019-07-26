'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema({
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
    type: Number,
    required: false,
    unique: false
  },
  image: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: false,
    unique: false
  },
  creator: {
    type: String,
    required: true,
    unique: false
  }
}, {
  timestamps: true
});

const Park = mongoose.model('Park', parkSchema);

module.exports = Park;
