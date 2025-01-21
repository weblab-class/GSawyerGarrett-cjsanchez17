import React from "react";
import "./SongCard.css";
import { useState, useEffect } from "react";
const CLIENT_ID = "c708b6906aeb425ab539cf51c38157d4";
const CLIENT_SECRET = "5a1c3ea5e2de419b91b640b371a6149d";
const SongCard = () => {
  //   const [isPlaying, setIsPlaying] = useState(false);
  //   const [audio, setAudio] = useState(null);
  //   const [token, setToken] = useState(null);
  //   const [accessToken, setAccessToken] = useState(null);
  //   const [refreshToken, setRefreshToken] = useState(null);
  const [songQuery, setSongQuery] = useState("");
  // Spotify api implementation; pulling song info from spotify api
  const [access_token, setAccessToken] = useState("null");
  useEffect(() => {
    const authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
        console.log(data.access_token);
      });
  }, []);

  // Search by tag(s)
  let tag = "pop";
  async function searchByTag(tag) {
    console.log("search for tag: " + tag);
  }
  return (
    <div className="song-card-container">
      <div className="song-card">
        <div className="song-card-album-container">
          <img src="#" alt="Song" className="album-cover" />
        </div>
        <div className="song-info">
          <p className="song-title">Song Name</p>
          <p className="artist-name">Artist Name</p>
          <p className="album-details">Album Name - Release Date</p>
          <button onClick={() => searchByTag(tag)} className="play-button">
            ▶ Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
