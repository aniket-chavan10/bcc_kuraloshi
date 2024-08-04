const express = require('express');
const router = express.Router();
const multer = require('multer');
const { bucket } = require('../firebase'); // Import Firebase bucket
const { v4: uuidv4 } = require('uuid');
const Fixture = require('../models/fixtureModel'); // Import Fixture model

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

// POST endpoint to add a new fixture with file uploads
router.post('/', upload.fields([{ name: 'team1Logo', maxCount: 1 }, { name: 'team2Logo', maxCount: 1 }]), async (req, res) => {
  try {
    const team1LogoUrl = req.files['team1Logo'] ? await uploadFileToFirebase(req.files['team1Logo'][0]) : '';
    const team2LogoUrl = req.files['team2Logo'] ? await uploadFileToFirebase(req.files['team2Logo'][0]) : '';

    const newFixture = new Fixture({
      date: req.body.date,
      matchNumber: req.body.matchNumber,
      matchStatus: req.body.matchStatus,
      team1: {
        name: req.body.team1Name,
        score: req.body.team1Score,
        logo: team1LogoUrl,
      },
      team2: {
        name: req.body.team2Name,
        score: req.body.team2Score,
        logo: team2LogoUrl,
      },
      matchResult: req.body.matchResult,
      venue: req.body.venue,
      matchTime: req.body.matchTime,
    });

    await newFixture.save();
    res.status(201).json({ message: 'Fixture added successfully', fixture: newFixture });
  } catch (error) {
    console.error('Error adding fixture:', error);
    res.status(500).json({ message: 'Failed to add fixture', error });
  }
});

// GET endpoint to fetch all fixtures
// GET endpoint to fetch all fixtures
router.get('/', async (req, res) => {
  try {
    const fixtures = await Fixture.find({});
    res.json({ fixtures }); // Ensure response structure matches what fetchFixtures expects
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    res.status(500).json({ message: 'Failed to fetch fixtures', error });
  }
});


// GET endpoint to fetch a fixture by ID
router.get('/:id', async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);
    if (!fixture) {
      return res.status(404).json({ message: 'Fixture not found' });
    }
    res.json(fixture);
  } catch (error) {
    console.error('Error fetching fixture:', error);
    res.status(500).json({ message: 'Failed to fetch fixture', error });
  }
});

// PUT endpoint to update a fixture by ID
router.put('/:id', upload.fields([{ name: 'team1Logo', maxCount: 1 }, { name: 'team2Logo', maxCount: 1 }]), async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);
    if (!fixture) {
      return res.status(404).json({ message: 'Fixture not found' });
    }

    const team1LogoUrl = req.files['team1Logo'] ? await uploadFileToFirebase(req.files['team1Logo'][0]) : fixture.team1.logo;
    const team2LogoUrl = req.files['team2Logo'] ? await uploadFileToFirebase(req.files['team2Logo'][0]) : fixture.team2.logo;

    const updates = {
      date: req.body.date,
      matchNumber: req.body.matchNumber,
      matchStatus: req.body.matchStatus,
      team1: {
        name: req.body.team1Name,
        score: req.body.team1Score,
        logo: team1LogoUrl,
      },
      team2: {
        name: req.body.team2Name,
        score: req.body.team2Score,
        logo: team2LogoUrl,
      },
      matchResult: req.body.matchResult,
      venue: req.body.venue,
      matchTime: req.body.matchTime,
    };

    Object.assign(fixture, updates);
    await fixture.save();
    res.json({ message: 'Fixture updated successfully', fixture });
  } catch (error) {
    console.error('Error updating fixture:', error);
    res.status(500).json({ message: 'Failed to update fixture', error });
  }
});

module.exports = router;
