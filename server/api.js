/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Song = require("./models/song");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/library", (req, res) => {
  if (!req.user) {
    console.error("Unauthorized access to /library");
    return res.status(401).send({ error: "Unauthorized" });
  }

  Song.find({ user_id: req.user._id })
    .then((songs) => res.send(songs))
    .catch((err) => {
      console.error("Error fetching songs:", err);
      res.status(500).send({ error: "Failed to fetch songs" });
    });
});

router.post("/library", (req, res) => {
  if (!req.user) {
    console.error("Unauthorized access to POST /library");
    return res.status(401).send({ error: "Unauthorized" });
  }

  const { vibe, track, artist, cover } = req.body;

  if (!vibe || !track || !artist) {
    console.error("Missing fields in request body:", req.body);
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newSong = new Song({
    user_id: req.user._id,
    vibe,
    track,
    artist,
    cover: cover || "",
  });

  newSong
    .save()
    .then((savedSong) => res.send(savedSong))
    .catch((err) => {
      console.error("Error saving song:", err);
      res.status(500).send({ error: "Failed to save song" });
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
