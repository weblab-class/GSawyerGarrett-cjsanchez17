import React, { useState, useEffect, useContext } from "react";
import "./Library.css";
import { UserContext } from "../App";
import { get, post } from "../../utilities";

const Library = () => {
  const [savedSongs, setSavedSongs] = useState([]);
  const userId = useContext(UserContext);

  // Fetch saved songs from the backend
  useEffect(() => {
    if (userId) {
      get("/api/library")
        .then((songs) => setSavedSongs(songs))
        .catch((err) => console.error("Error fetching library:", err));
    }
  }, [userId]);

  // Add a new song to the library
  const addNewSong = async (song) => {
    try {
      const newSong = await post("/api/library", song);
      setSavedSongs([newSong, ...savedSongs]);
    } catch (err) {
      console.error("Error adding new song:", err);
    }
  };

  return (
    <div className="library-container">
      <div className="library-section">
        <h2 className="library-title">Saved Songs</h2>
        <div className="library-scrollable library-grid">
          {savedSongs.length > 0 ? (
            savedSongs.map((song) => (
              <div key={song._id} className="library-item">
                <img
                  src={song.cover || "../../assets/placeholder.jpeg"}
                  alt={song.track}
                  className="album-cover"
                />
                <p className="album-title">{song.track}</p>
                <p className="album-artist">{song.artist}</p>
              </div>
            ))
          ) : (
            <p>No saved songs yet!</p>
          )}
        </div>
      </div>

      {/* Example section to test adding songs */}
      <div className="library-section">
        <h2 className="library-title">Add a New Song</h2>
        <button
          onClick={() =>
            addNewSong({
              track: "Sample Track",
              artist: "Sample Artist",
              vibe: "Chill",
              cover: "../../assets/sample-cover.jpeg", // Optional
            })
          }
        >
          Add Sample Song
        </button>
      </div>
    </div>
  );
};

export default Library;
