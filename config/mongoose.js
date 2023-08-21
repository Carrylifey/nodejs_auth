const mongoose = require('mongoose');
const env = require('../config/environment');
mongoose.connect('mongodb+srv://subhankarnodejs:subhankarnodejs@atlascluster.8biejpu.mongodb.net/');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function () {
  console.log('Connected to database :: MongoDB');
});

module.exports = db;