const express = require('express');
const router = express.Router();
const City = require('../models/City');
router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/cities/:id/weather', async (req, res) => {
    const { id } = req.params;
    try {
        const city = await City.findById(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found '});
        }
        res.json(city.weather);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error'})
    }
});

router.post('/cities/:id/weather', async (req, res) => {
    const { id } = req.params;
    const { description, temperature, humidity } = req.body;
    try {
        const city = await City.findById(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        const newWeather = { description, temperature, humidity };
        city.weather.push(newWeather);
        await city.save();
        res.json(newWeather);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/cities/:city_id/weather/:weather_id', async (req, res) => {
    const { city_id, weather_id } = req.params;
    const { description, temperature, humidity } = req.body;

    try {
        const city = await City.findById(city_id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        const weather = city.weather.id(weather_id);
        if (!weather) {
            return res.status(404).json({ message: 'Weather data not found' });
        }

        // Update weather data
        weather.set({ description, temperature, humidity });
        await city.save();

        res.json(weather);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete weather data for a city
router.delete('/cities/:city_id/weather/:weather_id', async (req, res) => {
    const { city_id, weather_id } = req.params;

    try {
        const city = await City.findById(city_id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        // Use the id method to convert the string to a MongoDB ObjectId
        const weatherObjectId = city.weather.id(weather_id);
        if (!weatherObjectId) {
            return res.status(404).json({ message: 'Weather data not found' });
        }

        // Remove weather data using the splice method
        const removedWeather = city.weather.id(weather_id);
        city.weather.splice(city.weather.indexOf(removedWeather), 1); // Use splice to remove the element
        await city.save();

        res.json({ message: 'Weather data deleted successfully', removedWeather });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;


