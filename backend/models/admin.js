const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures MongoDB enforces uniqueness
    index: true, // Explicitly create an index on the email field
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware to hash the password before saving
AdminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the Admin model with indexing
module.exports = mongoose.model('Admin', AdminSchema);
