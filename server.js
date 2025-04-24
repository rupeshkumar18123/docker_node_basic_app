const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// Initialize app and middleware
const app = express();
app.use(express.json()); // Use built-in JSON parser

require("./db.js");
const User = require("./User.js");


// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Routes
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(400).send('Username and password are required');
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const newUser = new User({ username, email, password });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ username });
        if (user && user.password === password) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
});

// Start server
const PORT = 1812;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
