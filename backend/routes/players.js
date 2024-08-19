const express = require("express");
const router = express.Router();
const multer = require("multer");
const { bucket } = require("../firebase"); // Import Firebase bucket
const { v4: uuidv4 } = require("uuid");
const Player = require("../models/players"); // Import Player model

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
    action: "read",
    expires: "03-01-2500", // Adjust expiry date as needed
  });

  return url; // Return the signed URL
};

// POST endpoint for adding a new player
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
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
      instaUrl: req.body.instaUrl,
    });

    const validationErrors = newPlayer.validateSync();
    if (validationErrors) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: validationErrors });
    }

    await newPlayer.save();
    res
      .status(201)
      .json({ message: "Player added successfully", player: newPlayer });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ message: "Failed to add player", error });
  }
});

// GET endpoint to fetch all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find({});

    if (players.length === 0) {
      console.log("No players found in the database.");
    }

    const playersWithUrls = players.map((player) => ({
      ...player.toObject(),
      image: player.image, // Already a signed URL
    }));

    res.json(playersWithUrls);
  } catch (err) {
    console.error("Error retrieving players:", err);
    res.status(500).json({ message: err.message });
  }
});

// PUT endpoint for updating a player
router.put("/:id/profile", upload.single("image"), async (req, res) => {
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
      instaUrl: req.body.instaUrl,
    };

    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      updatedData,
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ message: "Failed to update player", error });
  }
});

// Update player stats
router.put("/:id/stats", async (req, res) => {
  const { id } = req.params;
  const { runs, wickets, monthlyStats, bestScore, matches } = req.body;

  try {
    console.log(`Received stats update: matches=${matches}, runs=${runs}, wickets=${wickets}`);

    const player = await Player.findById(id);
    if (!player) return res.status(404).json({ error: "Player not found" });

    player.matches = matches;
    player.runs = runs;
    player.wickets = wickets;
    player.monthlyStats = monthlyStats;
    player.bestScore = bestScore;

    await player.save();

    console.log(`Stats updated for player ${player.name}: matches=${player.matches}`);
    res.json(player);
  } catch (error) {
    console.error("Error updating player stats:", error);
    res.status(500).json({ error: "Failed to update player stats" });
  }
});


module.exports = router;
