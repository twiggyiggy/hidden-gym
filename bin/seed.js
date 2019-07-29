'use strict';

const Gym = require('../models/Gym');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hidden-gym', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const gyms = [
  {
    address: 'Barceloneta Beach',
    upvotes: 4,
    totalVotes: 7,
    averageRating: 6.5,
    imageUrl: 'https://living-in-stuttgart.com/wp-content/uploads/2017/08/calisthenics-in-Stuttgart-Degerloch.jpg',
    additionalInfo: 'Full of topless beefy dudes and pickpockets. Stay clear.',
    equipmentAvailable: 'Pull-Up-Bar Station',
    creator: 'CodyKo'
  },
  {
    address: 'Ciutadella',
    upvotes: 9,
    totalVotes: 10,
    averageRating: 9,
    imageUrl: 'https://calisthenics-parks.com/attachments/Bx9p40hiRORZ7U2bMrYc2SAXzZpVTdcKTD46JvD8_1000.jpg',
    additionalInfo: 'Banging gym, but busy on weekends.',
    creator: 'Jesus'
  },
  {
    address: 'Parc Montjuic',
    upvotes: 1,
    totalVotes: 11,
    averageRating: 0.8,
    imageUrl: 'https://kengurupro.eu/wp-content/uploads/2019/02/001-8.jpg',
    additionalInfo: 'Literally everything is broken',
    creator: 'Jorge'
  }
];

async function addGyms (gyms) {
  await Gym.create(gyms);
  mongoose.disconnect();
};

addGyms(gyms);
