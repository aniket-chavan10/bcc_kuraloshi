const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/", async (req, res) => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN; // Store securely in environment variables

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    res.status(500).send("Failed to fetch Instagram posts");
  }
});

module.exports = router;
