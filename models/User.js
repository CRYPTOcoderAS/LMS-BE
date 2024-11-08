const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  pan: { type: String, required: true, unique: true, uppercase: true },
  aadhaar: { type: String, required: true, unique: true },
  gstin: { type: String, required: true, unique: true },
  udyam: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 