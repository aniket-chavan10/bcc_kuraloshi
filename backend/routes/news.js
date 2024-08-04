const express = require('express');
const router = express.Router();
const multer = require('multer');
const { bucket } = require('../firebase'); // Import Firebase bucket
const { v4: uuidv4 } = require('uuid');
const NewsItem = require('../models/newsModel'); // Import NewsItem model

// Configure Multer for in-memory file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload files to Firebase Storage and return the signed URL
const uploadFileToFirebase = async (file) => {
  const fileName = `${uuidv4()}-${file.originalname}`;
  const fileRef = bucket.file(fileName);
  await fileRef.save(file.buffer, { contentType: file.mimetype });

  // Generate a signed URL for the uploaded file
  const [url] = await fileRef.getSignedUrl({
    action: 'read',
    expires: '03-01-2500', // Adjust expiry date as needed
  });

  return url; // Return the signed URL
};

// POST endpoint for adding a new news item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { title, description } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = await uploadFileToFirebase(req.file); // Upload file and get signed URL
    }

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ message: 'Title, description, and image are required.' });
    }

    const newNewsItem = new NewsItem({
      title,
      description,
      imageUrl,
    });

    const validationErrors = newNewsItem.validateSync();
    if (validationErrors) {
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }

    await newNewsItem.save();
    res.status(201).json({ message: 'News item added successfully', item: newNewsItem });
  } catch (error) {
    console.error('Error adding news item:', error);
    res.status(500).json({ message: 'Failed to add news item', error });
  }
});

// GET endpoint to fetch all news items
router.get('/', async (req, res) => {
  try {
    const newsItems = await NewsItem.find({})
      .sort({ createdAt: -1 }); // Sort by created date descending

    // Map over items to replace file paths with full URLs
    const newsItemsWithUrls = newsItems.map(item => ({
      ...item.toObject(),
      imageUrl: item.imageUrl, // Already a signed URL
    }));

    res.json(newsItemsWithUrls);
  } catch (error) {
    console.error('Error retrieving news items:', error);
    res.status(500).json({ message: 'Error retrieving news items.' });
  }
});

// GET endpoint to fetch a single news item by ID
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await NewsItem.findById(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ message: 'News item not found' });
    }

    res.json(newsItem);
  } catch (error) {
    console.error('Error retrieving news item:', error);
    res.status(500).json({ message: 'Error retrieving news item.' });
  }
});

// PUT endpoint to update a news item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const itemId = req.params.id;
    const { title, description } = req.body;
    let imageUrl = req.body.imageUrl; // Use existing image if not updated

    if (req.file) {
      imageUrl = await uploadFileToFirebase(req.file); // Upload new file and get signed URL
    }

    const updatedData = {
      title,
      description,
      imageUrl,
    };

    const updatedNewsItem = await NewsItem.findByIdAndUpdate(itemId, updatedData, { new: true });

    if (!updatedNewsItem) {
      return res.status(404).json({ message: 'News item not found' });
    }

    res.json({ message: 'News item updated successfully', item: updatedNewsItem });
  } catch (error) {
    console.error('Error updating news item:', error);
    res.status(500).json({ message: 'Failed to update news item', error });
  }
});

module.exports = router;
