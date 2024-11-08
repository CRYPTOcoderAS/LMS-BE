const User = require('../models/User');
const { validateUserData, validateObjectId } = require('../utils/validations');

exports.createUser = async (req, res) => {
  try {
    const validationError = validateUserData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate entry found. PAN, Aadhaar, GSTIN, or UDYAM already exists.' 
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!validateObjectId(id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};