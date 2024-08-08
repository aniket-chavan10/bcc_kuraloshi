const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Simple validation for 10-digit mobile numbers
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v); // Email validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
