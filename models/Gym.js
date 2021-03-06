'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const gymSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  upvotes: {
    type: Number,
    default: 0,
    unique: false
  },
  usersVotes: {
    type: [{
      type: ObjectId,
      ref: 'User'
    }]
  },
  averageRating: {
    type: Number,
    unique: false
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/dygs6mymv/image/upload/v1564402920/Hidden%20Gym/calisthenics-park1_pn1gcy.jpg'
  },
  equipmentAvailable: {
    type: Array
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
