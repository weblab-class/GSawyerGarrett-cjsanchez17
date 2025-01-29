import React, { useState, useEffect, useContext } from "react";
import "./Library.css";
import { UserContext } from "../App";
import { get, del } from "../../utilities"; // Import "del" function
import SongCard from "../modules/SongCard"; // Import SongCard component

const Library = () => {
  const [savedSongs, setSavedSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null); // Store selected song
  const userId = useContext(UserContext);

  // Fetch saved songs from the backend
  useEffect(() => {
    if (userId) {
      get("/api/library")
        .then((songs) => setSavedSongs(songs))
        .catch((err) => console.error("Error fetching library:", err));
    }
  }, [userId]);

  // Remove a song from the library
  const removeSong = async (songId) => {
    try {
      await del(`/api/library/${songId}`); // Call delete API
      setSavedSongs(savedSongs.filter((song) => song._id !== songId)); // Update UI
      if (selectedSong?._id === songId) {
        setSelectedSong(null); // Close SongCard if the song is deleted
      }
    } catch (err) {
      console.error("Error removing song:", err);
    }
  };

  return (
    <div className="library-container">
      {/* Animated Background Dots (Doesn't Affect Anything Else) */}
      <div className="animated-background">
        {[...Array(1000)].map((_, i) => (
          <div key={i} className="tiny-dot" />
        ))}
      </div>

      <div className="library-section">
        <h2 className="library-title">Saved Songs</h2>
        <div className="library-scrollable library-grid">
          {savedSongs.length > 0 ? (
            savedSongs.map((song) => (
              <div
                key={song._id}
                className="library-item"
                onClick={() => setSelectedSong(song)} // Show SongCard when clicked
              >
                <img
                  src={song.cover || "../../assets/placeholder.jpeg"}
                  alt={song.track}
                  className="album-cover"
                />
                <p className="album-title">{song.track}</p>
                <p className="album-artist">{song.artist}</p>
                {/* Remove Button */}
                <button
                  className="remove-song-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering SongCard
                    removeSong(song._id);
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="no-songs-container">
              <p className="no-songs-message">No saved songs yet!</p>
            </div>
          )}
        </div>
      </div>

      {/* Display SongCard when a song is selected */}
      {selectedSong && (
        <SongCard
          album={{
            name: selectedSong.track,
            artist: selectedSong.artist,
            albumCover: selectedSong.cover,
            spotifyUrl: `https://open.spotify.com/search/${selectedSong.track} ${selectedSong.artist}`,
          }}
          onClose={() => setSelectedSong(null)} // Close when the user exits
          query={selectedSong.vibe || "Unknown Vibe"} // Display the correct query from VibePage or Browse
          // Indicate that this is from the library
          currentIndex={0} // No multiple tracks, so set to 0
          totalTracks={1} // Only one song displayed at a time
        />
      )}
    </div>
  );
};

export default Library;
