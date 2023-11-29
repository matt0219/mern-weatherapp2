const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURI || 'mongodb://127.0.0.1:27017/weatherapp');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/weatherapp');

module.exports = mongoose.connection;
*/