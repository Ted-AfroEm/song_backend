const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
});

module.exports = mongoose.model("Song", songSchema);
