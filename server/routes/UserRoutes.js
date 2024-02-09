const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route for user registration
router.post('/register', async (req, res) => {
    // Extract registration data from request body
    const { username, email, password } = req.body;

    try {
        // Create a new user document
        const newUser = new User({
            username,
            email,
            password
        });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});

module.exports = router;