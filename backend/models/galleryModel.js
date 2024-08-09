const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    thumbnailImageUrl: { type: String, required: true },
    caption: { type: String, required: true },
    imageUrls: [{ type: String, required: true }], // Changed the field name for clarity
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
