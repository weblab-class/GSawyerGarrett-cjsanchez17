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
      <button className="back-button" onClick={onClose} style={{ fontSize: "1.5rem" }}>
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
            Listen on Spotify
          </a>
        </div>

        {/* Track Counter */}
        <div className="track-counter">
          {currentIndex + 1}/{totalTracks}
        </div>

        {/* Save Button */}
        <button className="save-button" onClick={() => onSave(album)}>
          Save to Library
        </button>
      </div>

      {/* Navigation Controls */}
      {currentIndex > 0 && (
        <button className="previous-button" onClick={onPrevious}>
          ←
        </button>
      )}
      {currentIndex < totalTracks - 1 && (
        <button className="next-button" onClick={onNext}>
          →
        </button>
      )}
    </div>
  );
};

export default SongCard;
