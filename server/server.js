const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const cityRoutes = require('./routes/cityRoutes');
const userRoutes = require('./routes/UserRoutes');
const cors = require('cors');
require('dotenv').config()

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/connection');

app.use(cors());
app.use(express.json());
app.use('/api', cityRoutes);
app.use('/api/users', userRoutes);


// OpenWeatherMap API integration
const apiKey = process.env.OPENWEATHERMAP_API_KEY;
if (!apiKey) {
    throw new Error('Missing OPENWEATHERMAP_API_KEY environment variable');
}

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = await response.data;
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})