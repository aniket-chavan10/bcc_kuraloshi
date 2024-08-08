const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN; // Store securely in environment variables

  try {
    const response = await axios.get(`https://graph.instagram.com/me/media`, {
      params: {
        fields: "id,caption,media_url,media_type,permalink",
        access_token: accessToken,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    res.status(500).send("Failed to fetch Instagram posts");
  }
});

module.exports = router;
