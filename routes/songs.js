const express = require("express");
const mongoose = require("mongoose");
const Song = require("../models/song");

const router = express.Router();

const formatResponse = (data, message, statusCode) => {
  return { data, message, statusCode };
};

// Middleware to validate ObjectId format
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(formatResponse(null, "Invalid ID format", 400));
  }
  next();
};

// Add new song
router.post("/", async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res
      .status(201)
      .json(formatResponse(song, "Song created successfully", 201));
  } catch (err) {
    res.status(400).json(formatResponse(null, err.message, 400));
  }
});

// List all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res
      .status(200)
      .json(formatResponse(songs, "Songs retrieved successfully", 200));
  } catch (err) {
    res.status(500).json(formatResponse(null, err.message, 500));
  }
});

// Update a song by id
router.put("/:id", validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndUpdate(id, req.body, { new: true });
    if (!song) {
      return res.status(404).json(formatResponse(null, "Song not found", 404));
    }
    res
      .status(200)
      .json(formatResponse(song, "Song updated successfully", 200));
  } catch (err) {
    res.status(400).json(formatResponse(null, err.message, 400));
  }
});

// Delete a song by id
router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedSong = await Song.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json(formatResponse(null, "Song not found", 404));
    }
    res.json(formatResponse(null, "Song deleted successfully", 200));
  } catch (err) {
    res.status(400).json(formatResponse(null, err.message, 400));
  }
});

module.exports = router;
