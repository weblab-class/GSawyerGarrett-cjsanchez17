import React from "react";
import "./SongCard.css";

const SongCard = ({ album, onClose, onNext }) => {
  if (!album) return null;

  return (
    <div className="songcard-overlay">
      <button className="back-button" onClick={onClose}>
        ← Back
      </button>
      <div className="songcard-content">
        <div
          className="song-card-album-container"
          style={{ backgroundImage: `url(${album.albumCover})` }}
        ></div>
        <div className="song-info">
          <p className="song-title">{album.name}</p>
          <p className="artist-name">{album.artist}</p>
          <p className="album-details">Released: {album.releaseDate}</p>

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
      </div>
      <button className="next-button" onClick={onNext}>
        Next →
      </button>
    </div>
  );
};

export default SongCard;
