const mongoose = require("mongoose");
const Song = require("../models/Songs");

const songs = [
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    genre: "Rock",
  },
  {
    title: "Rhapsody in Blue",
    artist: "George Gershwin",
    album: "Rhapsody in Blue",
    genre: "Classical",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    genre: "Pop",
  },
  {
    title: "Shape of My Heart",
    artist: "Sting",
    album: "Ten Summoner's Tales",
    genre: "Soft Rock",
  },
  {
    title: "Heart-Shaped Box",
    artist: "Nirvana",
    album: "In Utero",
    genre: "Grunge",
  },
  {
    title: "Love of My Life",
    artist: "Queen",
    album: "A Night at the Opera",
    genre: "Rock",
  },
  {
    title: "Love Will Tear Us Apart",
    artist: "Joy Division",
    album: "Unknown Pleasures",
    genre: "Post-Punk",
  },
  {
    title: "Apart",
    artist: "The Cure",
    album: "Wish",
    genre: "Gothic Rock",
  },
  {
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    genre: "Pop",
  },
  {
    title: "Billie's Bounce",
    artist: "Charlie Parker",
    album: "The Original Bird",
    genre: "Jazz",
  },
];

mongoose
  .connect("mongodb://localhost:27017/songsDB")
  .then(() => console.log("MongoDB connected to seed"))
  .catch((err) => console.error("MongoDB connetion error:", err));

async function seedDatabase() {
  try {
    await Song.deleteMany(); //Clear
    await Song.insertMany(songs);
    console.log("Songs DB seeded successfully");
  } catch (err) {
    console.log("Error seeding database:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
