import React from "react";
import "./Library.css";

import cover1 from "../../assets/cover1.jpeg";
import cover2 from "../../assets/cover2.jpeg";
import cover3 from "../../assets/cover3.jpeg";

const Library = () => {
  const savedSongs = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Song ${index + 1}`,
    cover: [cover1, cover2, cover3][index % 3],
  }));

  const savedSearches = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Search ${index + 1}`,
  }));

  return (
    <div className="library-container">
      <div className="library-section">
        <h2 className="library-title">Saved Songs</h2>
        <div className="library-scrollable library-grid">
          {savedSongs.map((song) => (
            <div key={song.id} className="library-item">
              <img src={song.cover} alt={song.title} className="album-cover" />
              <p className="album-title">{song.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="library-section">
        <h2 className="library-title">Recent Searches</h2>
        <div className="library-scrollable library-grid">
          {savedSearches.map((search) => (
            <div key={search.id} className="library-search-block">
              <p className="search-title">{search.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
