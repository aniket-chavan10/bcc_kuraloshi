const express = require('express');
const router = express.Router();
const ContactUs = require('../models/contactus'); // Adjust the path as necessary

// POST route to handle form submissions
router.post('/', async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;

    // Create a new contact entry
    const newContact = new ContactUs({
      name,
      mobile,
      email,
      message,
    });

    // Save the contact entry to the database
    await newContact.save();

    // Send a success response
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// GET route to retrieve all contact messages
router.get('/', async (req, res) => {
  try {
    // Fetch all contact messages from the database
    const contacts = await ContactUs.find();

    // Send the contacts as a response
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to retrieve messages. Please try again later.' });
  }
});

module.exports = router;
