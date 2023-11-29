const { default: mongoose } = require('mongoose');
const db = require('../config/connection');
const City = require('../models/City');
const seedData = require('./CitySeeds.json');

db.once('open', async () => {
    try {      
      await City.create(seedData);
  
      console.log('all done!');
      process.exit(0);
    } catch (err) {
      throw err;
    }
  });