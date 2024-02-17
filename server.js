const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const songsRouter = require("./routes/songs");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/songsDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connetion error:", err));

app.use(cors());
// Routes
app.use("/api/songs", songsRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
