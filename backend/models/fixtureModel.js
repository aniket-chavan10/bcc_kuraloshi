const mongoose = require("mongoose");

const fixtureSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  matchNumber: {
    type: Number,
    required: true,
  },
  matchStatus: {
    type: String,
    enum: ['completed', 'upcoming'],
    required: true,
  },
  team1Name: {
    type: String,
    required: true,
  },
  team1Logo: {
    type: String,
    required: true,
  },
  team1Score: {
    type: String,
    required: true,
  },
  team2Name: {
    type: String,
    required: true,
  },
  team2Logo: {
    type: String,
    required: true,
  },
  team2Score: {
    type: String,
    required: true,
  },
  matchResult: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  matchTime: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Fixture", fixtureSchema);
