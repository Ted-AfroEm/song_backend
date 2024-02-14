const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/songsDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connetion error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
