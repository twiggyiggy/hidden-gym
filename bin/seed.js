'use strict';

const Park = require('../models/Park');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hidden-gym', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const parks = [
  {
    address: 'Barceloneta Beach',
    upvotes: 4,
    totalVotes: 7,
    averageRating: 6.5,
    imageUrl: 'https://living-in-stuttgart.com/wp-content/uploads/2017/08/calisthenics-in-Stuttgart-Degerloch.jpg',
    description: 'Full of topless beefy dudes and pickpockets. Stay clear.',
    creator: 'CodyKo'
  },
  {
    address: 'Ciutadella',
    upvotes: 9,
    totalVotes: 10,
    averageRating: 9,
    imageUrl: 'https://calisthenics-parks.com/attachments/Bx9p40hiRORZ7U2bMrYc2SAXzZpVTdcKTD46JvD8_1000.jpg',
    description: 'Banging park, but busy on weekends.',
    creator: 'Jesus'
  },
  {
    address: 'Parc Montjuic',
    upvotes: 1,
    totalVotes: 11,
    averageRating: 0.8,
    imageUrl: 'https://kengurupro.eu/wp-content/uploads/2019/02/001-8.jpg',
    description: 'Literally everything is broken',
    creator: 'Jorge'
  }
];
// what's happening below?
// Park.create(seeds).then((parks) => {
//   console.log(parks);
//   mongoose.connection.close();
// }).catch((error) => {
//   console.log(error);
// });
async function addParks (parks) {
  await Park.create(parks);
  // for (let i = 0; i < parks.length; i++) {
  //   await Park.create({ address: parks[i].address, upvotes: parks[i].upvotes, totalVotes: parks[i].totalVotes, averageRating: parks[i].averageRating, imageUrl: parks[i].imageUrl, description: parks[i].description, creator: parks[i].creator });
  // }
  mongoose.disconnect();
};

addParks(parks);
