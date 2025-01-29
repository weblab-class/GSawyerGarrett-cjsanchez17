const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  vibe: { type: String, required: true },
  track: { type: String, required: true },
  artist: { type: String, required: true },
  cover: { type: String }, // Optional
});

module.exports = mongoose.model("Song", SongSchema);
