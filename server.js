const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// Initialize app and middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require("./db.js");
const User = require("./User.js");


// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Routes
app.post('/register', async (req, res) => {
    const { name, password, email } = req.body;
    try {
        if (!name || !password || !email) {
            return res.status(400).send('Username and password are required');
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const newUser = new User({ name, email, password });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ email });
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
