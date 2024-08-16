const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: String,
  jerseyNo: Number,
  matches: Number,
  runs: Number,
  wickets: Number,
  age: Number,
  image: String,
  role: String,
  subrole: String,
  bestScore: Number,
  instaUrl: String,
  monthlyStats: [
    {
      month: String, // e.g., "2024-08"
      runs: Number,
      wickets: Number
    }
  ]
});

module.exports = mongoose.model('Player', playerSchema);
