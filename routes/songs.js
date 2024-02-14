const express = require("express");
const router = express.Router();
const Song = require("../models/Songs");

//Route to crate a new song
router.post("/", async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json({ song });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json({ songs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
