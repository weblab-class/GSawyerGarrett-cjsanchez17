import React from "react";
import "./SongCard.css";

const SongCard = ({
  album,
  onClose,
  onNext,
  onPrevious,
  query,
  currentIndex,
  totalTracks,
  onSave,
}) => {
  if (!album) return null;

  return (
    <div className="songcard-overlay">
      {/* Back Button */}
      <button className="back-button" onClick={onClose}>
        ← Back
      </button>

      <div className="songcard-content">
        {/* Query Display */}
        <div className="query-display">Results For: {query}</div>

        {/* Album Cover */}
        <div
          className="song-card-album-container"
          style={{
            backgroundImage: `url(${album.albumCover || "https://via.placeholder.com/300"})`,
          }}
        ></div>

        {/* Song Info */}
        <div className="song-info">
          <p className="song-title">{album.name || "Unknown Title"}</p>
          <p className="artist-name">{album.artist || "Unknown Artist"}</p>
          <p className="album-details">Released: {album.releaseDate || "Unknown Date"}</p>

          {album.previewUrl ? (
            <audio controls>
              <source src={album.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="no-preview">No preview available</p>
          )}

          <a
            className="spotify-link"
            href={album.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            🎧 Listen on Spotify
          </a>
        </div>

        {/* Track Counter */}
        <div className="track-counter">
          Track {currentIndex + 1} of {totalTracks}
        </div>

        {/* ✅ Save Button (New) */}
        <button className="save-button" onClick={() => onSave(album)}>
          💾 Save to Library
        </button>
      </div>

      {/* Previous Button */}
      <button
        className="previous-button"
        onClick={onPrevious}
        style={{ opacity: onPrevious ? 1 : 0.5, pointerEvents: onPrevious ? "auto" : "none" }}
      >
        ← Previous
      </button>

      {/* Next Button */}
      <button
        className="next-button"
        onClick={onNext}
        style={{ opacity: onNext ? 1 : 0.5, pointerEvents: onNext ? "auto" : "none" }}
      >
        Next →
      </button>
    </div>
  );
};

export default SongCard;
