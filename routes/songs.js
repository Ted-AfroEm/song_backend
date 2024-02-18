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
    const deletedSong = await Song.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json(formatResponse(null, "Song not found", 404));
    }
    res.json(formatResponse(deletedSong, "Song deleted successfully", 200));
  } catch (err) {
    res.status(400).json(formatResponse(null, err.message, 400));
  }
});

// Route to get overall statistics
// router.get("/statistics", async (req, res) => {
//   try {
//     // Total number of songs
//     const totalSongs = await Song.countDocuments();

//     // Total number of artists
//     const totalArtists = await Song.distinct("artist").count();

//     // Total number of albums
//     const totalAlbums = await Song.distinct("album").count();

//     // Total number of genres
//     const totalGenres = await Song.distinct("genre").count();

//     // Total number of songs in every genre
//     const songsInGenre = await Song.aggregate([
//       { $group: { _id: "$genre", count: { $sum: 1 } } },
//     ]);

//     // Total number of songs & albums each artist has
//     const songsByArtist = await Song.aggregate([
//       {
//         $group: {
//           _id: "$artist",
//           songs: { $sum: 1 },
//           albums: { $addToSet: "$album" },
//         },
//       },
//     ]);

//     // Total number of songs in each album
//     const songsInAlbum = await Song.aggregate([
//       { $group: { _id: "$album", count: { $sum: 1 } } },
//     ]);

//     res.json({
//       totalSongs,
//       totalArtists,
//       totalAlbums,
//       totalGenres,
//       songsInGenre,
//       songsByArtist,
//       songsInAlbum,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Route to get overall statistics or specific statistics using query parameters
router.get("/statistics", async (req, res) => {
  try {
    // Initialize empty object to store statistics
    const statistics = {};

    // Check query parameters to determine which statistics to retrieve
    if (req.query.totalSongs) {
      // Get total number of songs
      statistics.totalSongs = await Song.countDocuments();
    }

    if (req.query.totalArtists) {
      // Get total number of artists
      statistics.totalArtists = await Song.distinct("artist").count();
    }

    if (req.query.totalAlbums) {
      // Get total number of albums
      statistics.totalAlbums = await Song.distinct("album").count();
    }

    if (req.query.totalGenres) {
      // Get total number of genres
      statistics.totalGenres = await Song.distinct("genre").count();
    }

    // Retrieve total number of songs in every genre if requested
    if (req.query.totalSongsInGenre) {
      const songsInGenre = await Song.aggregate([
        { $group: { _id: "$genre", count: { $sum: 1 } } },
      ]);
      statistics.songsInGenre = songsInGenre;
    }

    // Retrieve total number of songs and albums each artist has if requested
    if (req.query.totalSongsAndAlbumsByArtist) {
      const songsByArtist = await Song.aggregate([
        {
          $group: {
            _id: "$artist",
            songs: { $sum: 1 },
            albums: { $addToSet: "$album" },
          },
        },
      ]);
      statistics.songsByArtist = songsByArtist;
    }

    // Retrieve total number of songs in each album if requested
    if (req.query.totalSongsInAlbum) {
      const songsInAlbum = await Song.aggregate([
        { $group: { _id: "$album", count: { $sum: 1 } } },
      ]);
      statistics.songsInAlbum = songsInAlbum;
    }

    res.json(statistics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
