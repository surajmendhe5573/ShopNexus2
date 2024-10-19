const User = require('../models/shipping.model');

const createUser = async (req, res) => {
  try {

    // Check if an entry with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }
    
    const user = new User({
      ...req.body,
      user: req.user.id // Assign the logged-in user's ID
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createUser };

// to store the shipping details of customer