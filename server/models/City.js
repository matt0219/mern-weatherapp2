const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    description: String,
    temperature: Number,
    humidity: Number,
});

const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    weather: [weatherSchema],
});

const City = mongoose.model('City', citySchema);

module.exports = City;
