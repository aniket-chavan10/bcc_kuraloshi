const express = require('express');
const router = express.Router();
const multer = require('multer');
const { bucket } = require('../firebase'); // Import the Firebase bucket
const { v4: uuidv4 } = require('uuid');
const Gallery = require('../models/galleryModel');

// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload files to Firebase Storage and return the file URL
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

// Route to add new gallery data with file uploads
router.post('/add', upload.fields([
  { name: 'thumbnailImageUrl', maxCount: 1 },
  { name: 'imageUrls', maxCount: 10 }
]), async (req, res) => {
  try {
    const { caption } = req.body;

    console.log('Received files:', req.files);

    // Upload thumbnail image and get the URL
    let thumbnailImageUrl = '';
    if (req.files['thumbnailImageUrl']) {
      thumbnailImageUrl = await uploadFileToFirebase(req.files['thumbnailImageUrl'][0]);
      console.log('Thumbnail image URL:', thumbnailImageUrl);
    }

    // Upload additional images and get their URLs
    const imageUrls = req.files['imageUrls'] 
      ? await Promise.all(req.files['imageUrls'].map(file => uploadFileToFirebase(file)))
      : [];

    console.log('Additional image URLs:', imageUrls);

    // Create new gallery item
    const newGallery = new Gallery({
      thumbnailImageUrl,
      caption,
      imageUrls, // Ensure imageUrls is an array
    });

    console.log('Saving gallery item:', newGallery);

    const savedGallery = await newGallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    console.error('Error adding gallery data:', error);
    res.status(500).json({ error: 'Failed to add gallery data' });
  }
});


// GET route to fetch all gallery items
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find({}).sort({ createdAt: -1 }); // Sort by createdAt descending
    res.json(galleryItems);
  } catch (error) {
    console.error('Error retrieving gallery items:', error);
    res.status(500).json({ message: 'Error retrieving gallery items.' });
  }
});

// GET route to fetch a single gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found.' });
    }
    res.json(galleryItem); // Make sure imageUrls are included
  } catch (error) {
    console.error('Error retrieving gallery item:', error);
    res.status(500).json({ message: 'Error retrieving gallery item.' });
  }
});


module.exports = router;
