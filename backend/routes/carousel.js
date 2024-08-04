const express = require('express');
const router = express.Router();
const multer = require('multer');
const { bucket } = require('../firebase'); // Import Firebase bucket
const { v4: uuidv4 } = require('uuid');
const CarouselItem = require('../models/carouselItem'); // Import CarouselItem model

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

// POST endpoint for adding a new carousel item
router.post('/', upload.single('imageUrl'), async (req, res) => {
  try {
    const { caption } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = await uploadFileToFirebase(req.file); // Upload file and get signed URL
    }

    if (!caption || !imageUrl) {
      return res.status(400).json({ message: 'Caption and image are required.' });
    }

    const newCarouselItem = new CarouselItem({
      imageUrl,
      caption,
    });

    const validationErrors = newCarouselItem.validateSync();
    if (validationErrors) {
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }

    await newCarouselItem.save();
    res.status(201).json({ message: 'Carousel item added successfully', item: newCarouselItem });
  } catch (error) {
    console.error('Error adding carousel item:', error);
    res.status(500).json({ message: 'Failed to add carousel item', error });
  }
});

// GET endpoint to fetch all carousel items
router.get('/', async (req, res) => {
  try {
    const carouselItems = await CarouselItem.find({})
      .sort({ createdAt: -1 }) // Sort by created date descending
      .limit(4); // Limit to the latest 4 items

    // Map over items to replace file paths with full URLs
    const carouselItemsWithUrls = carouselItems.map(item => ({
      ...item.toObject(),
      imageUrl: item.imageUrl, // Already a signed URL
    }));

    res.json(carouselItemsWithUrls);
  } catch (error) {
    console.error('Error retrieving carousel items:', error);
    res.status(500).json({ message: 'Error retrieving carousel items.' });
  }
});

// PUT endpoint to update a carousel item
router.put('/:id', upload.single('imageUrl'), async (req, res) => {
  try {
    const itemId = req.params.id;
    const { caption } = req.body;
    let imageUrl = req.body.imageUrl; // Use existing image if not updated

    if (req.file) {
      imageUrl = await uploadFileToFirebase(req.file); // Upload new file and get signed URL
    }

    const updatedData = {
      caption,
      imageUrl,
    };

    const updatedCarouselItem = await CarouselItem.findByIdAndUpdate(itemId, updatedData, { new: true });

    if (!updatedCarouselItem) {
      return res.status(404).json({ message: 'Carousel item not found' });
    }

    res.json({ message: 'Carousel item updated successfully', item: updatedCarouselItem });
  } catch (error) {
    console.error('Error updating carousel item:', error);
    res.status(500).json({ message: 'Failed to update carousel item', error });
  }
});

module.exports = router;
