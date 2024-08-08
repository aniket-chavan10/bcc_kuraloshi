const express = require("express");
const router = express.Router();
const multer = require("multer");
const { bucket } = require("../firebase"); // Import the Firebase bucket
const { v4: uuidv4 } = require("uuid");
const Info = require("../models/cricketCubModel");

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
    action: "read",
    expires: "03-01-2500", // Adjust expiry date as needed
  });

  return url; // Return the signed URL
};

// Route to get the latest cricket club entry
router.get("/", async (req, res) => {
  try {
    const latestClub = await Info.findOne().sort({ createdAt: -1 });
    if (!latestClub) {
      return res.status(404).json({ message: "No cricket club found" });
    }
    // Ensure URLs are properly set if necessary
    res.json(latestClub);
  } catch (error) {
    console.error("Error fetching cricket club information:", error);
    res
      .status(500)
      .json({
        message: "Error fetching cricket club information",
        error: error.message,
      });
  }
});

// Route to update the single cricket club entry
router.put(
  "/:id",
  upload.fields([
    { name: "teamImg", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      clubName,
      associationName,
      description,
      tagline,
      email,
      contactNumber,
      socialLinks,
    } = req.body;

    try {
      // Upload images if they exist
      const teamImg = req.files["teamImg"]
        ? await uploadFileToFirebase(req.files["teamImg"][0])
        : "";
      const logo = req.files["logo"]
        ? await uploadFileToFirebase(req.files["logo"][0])
        : "";

      const parsedSocialLinks = socialLinks ? JSON.parse(socialLinks) : {};
      const updatedClub = await Info.findByIdAndUpdate(
        req.params.id,
        {
          clubName,
          associationName,
          description,
          tagline,
          logo,
          teamImg,
          email,
          contactNumber,
          socialLinks: {
            facebook: parsedSocialLinks.facebook || "",
            twitter: parsedSocialLinks.twitter || "",
            instagram: parsedSocialLinks.instagram || "",
            youtube: parsedSocialLinks.youtube || "",
            whatsapp: parsedSocialLinks.youtube || "",
          },
        },
        { new: true }
      );
      if (!updatedClub) {
        return res.status(404).json({ message: "Cricket club not found" });
      }
      res.json({
        message: "Cricket club updated successfully",
        club: updatedClub,
      });
    } catch (error) {
      console.error("Error updating cricket club information:", error);
      res
        .status(500)
        .json({
          message: "Error updating cricket club information",
          error: error.message,
        });
    }
  }
);

// Route to create a new cricket club entry
router.post(
  "/",
  upload.fields([
    { name: "teamImg", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      clubName,
      associationName,
      description,
      tagline,
      email,
      contactNumber,
      socialLinks,
    } = req.body;

    try {
      // Upload images if they exist
      const teamImg = req.files["teamImg"]
        ? await uploadFileToFirebase(req.files["teamImg"][0])
        : "";
      const logo = req.files["logo"]
        ? await uploadFileToFirebase(req.files["logo"][0])
        : "";

      const parsedSocialLinks = socialLinks ? JSON.parse(socialLinks) : {};

      const newClub = new Info({
        clubName,
        associationName,
        description,
        tagline,
        email,
        contactNumber,
        teamImg,
        logo,
        socialLinks: {
          facebook: parsedSocialLinks.facebook || "",
          twitter: parsedSocialLinks.twitter || "",
          instagram: parsedSocialLinks.instagram || "",
          youtube: parsedSocialLinks.youtube || "",
          whatsapp: parsedSocialLinks.youtube || "",
        },
      });

      await newClub.save();
      res.json({ message: "Cricket club created successfully", club: newClub });
    } catch (error) {
      console.error("Error creating cricket club:", error);
      res
        .status(400)
        .json({ message: "Error creating cricket club", error: error.message });
    }
  }
);

module.exports = router;
