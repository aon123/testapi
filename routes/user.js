const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); // Import your User model here

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // You can now generate a JWT token and send it back to the client for future authenticated requests
    // Example using jsonwebtoken library:
    // const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
