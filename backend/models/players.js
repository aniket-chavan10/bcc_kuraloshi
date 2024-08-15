const mongoose = require("mongoose");

const MonthlyStatsSchema = new mongoose.Schema({
  month: {
    type: String, // Format: "YYYY-MM"
    required: true,
  },
  runs: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  }
});

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  jerseyNo: {
    type: Number,
    required: true,
  },
  matches: {
    type: Number,
    required: true,
  },
  runs: {
    type: Number,
    required: true,
  },
  wickets: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  subrole: {
    type: String,
    required: true,
  },
  bestScore: {
    type: Number,
    required: true,
  },
  instaUrl:{
    type: String,
    required: false
  },
  monthlyStats: [MonthlyStatsSchema]
});

module.exports = mongoose.model("playersModel", PlayerSchema);
