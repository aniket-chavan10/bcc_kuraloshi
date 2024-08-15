const express = require('express');
const router = express.Router();
const multer = require('multer');
const { bucket } = require('../firebase'); // Import Firebase bucket
const { v4: uuidv4 } = require('uuid');
const Player = require('../models/players'); // Import Player model

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

// POST endpoint for adding a new player
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadFileToFirebase(req.file); // Upload file and get signed URL
    }

    const newPlayer = new Player({
      name: req.body.name,
      jerseyNo: req.body.jerseyNo,
      matches: req.body.matches,
      runs: req.body.runs,
      wickets: req.body.wickets,
      age: req.body.age,
      image: imageUrl, // Store the signed URL
      role: req.body.role,
      subrole: req.body.subrole,
      bestScore: req.body.bestScore,
      instaUrl: req.body.instaUrl
    });

    const validationErrors = newPlayer.validateSync();
    if (validationErrors) {
      return res.status(400).json({ message: "Validation error", errors: validationErrors });
    }

    await newPlayer.save();
    res.status(201).json({ message: "Player added successfully", player: newPlayer });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ message: "Failed to add player", error });
  }
});

// GET endpoint to fetch all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find({});
    
    // Map over players to replace file paths with full URLs
    const playersWithUrls = players.map(player => ({
      ...player.toObject(),
      image: player.image // Already a signed URL
    }));

    res.json(playersWithUrls);
  } catch (err) {
    console.error('Error retrieving players:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT endpoint for updating a player
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const playerId = req.params.id;
    let imageUrl = req.body.image; // Use existing image if not updated

    if (req.file) {
      imageUrl = await uploadFileToFirebase(req.file); // Upload new file and get signed URL
    }

    const updatedData = {
      name: req.body.name,
      jerseyNo: req.body.jerseyNo,
      matches: req.body.matches,
      runs: req.body.runs,
      wickets: req.body.wickets,
      age: req.body.age,
      image: imageUrl, // Store the signed URL
      role: req.body.role,
      subrole: req.body.subrole,
      bestScore: req.body.bestScore,
      instaUrl: req.body.instaUrl
    };

    const updatedPlayer = await Player.findByIdAndUpdate(playerId, updatedData, { new: true });

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ message: "Failed to update player", error });
  }
});

router.put("/:id/stats", async (req, res) => {
  try {
    const playerId = req.params.id;
    const { runs, wickets } = req.body;

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const currentMonth = moment().format('YYYY-MM'); // e.g., "2024-08"
    const existingMonth = player.monthlyStats.find(stat => stat.month === currentMonth);

    if (existingMonth) {
      // Update existing month's stats
      existingMonth.runs += runs;
      existingMonth.wickets += wickets;
    } else {
      // Add new month's stats
      player.monthlyStats.push({ month: currentMonth, runs, wickets });
    }

    await player.save();
    res.json({ message: "Player stats updated successfully", player });
  } catch (error) {
    console.error("Error updating player stats:", error);
    res.status(500).json({ message: "Failed to update player stats", error });
  }
});

module.exports = router;
