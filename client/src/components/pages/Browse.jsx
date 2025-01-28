import React, { useEffect, useRef, useState } from "react";
import "./Browse.css";
import SongCard from "../modules/SongCard"; // Import SongCard component

import cover1 from "../../assets/cover1.jpeg";
import cover2 from "../../assets/cover2.jpeg";
import cover3 from "../../assets/cover3.jpeg";
import cover4 from "../../assets/cover4.jpeg";
import cover5 from "../../assets/cover5.jpeg";
import cover6 from "../../assets/cover6.jpeg";

// Sample placeholder albums
const albums = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  image: [cover1, cover2, cover3, cover4, cover5, cover6][index % 6],
  name: `Album ${index + 1}`,
  artist: `Artist ${index + 1}`,
  releaseDate: `202${index % 10}-01-01`, // Example release dates
}));

const Browse = () => {
  const rowsRef = useRef([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting
            ? entry.target.classList.add("fade-in-active")
            : entry.target.classList.remove("fade-in-active");
        });
      },
      { threshold: 0.6 }
    );

    const introSection = document.querySelector(".intro-section");
    if (introSection) observer.observe(introSection);

    rowsRef.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => {
      rowsRef.current.forEach((row) => {
        if (row) observer.unobserve(row);
      });
    };
  }, []);

  return (
    <div className="browse-wrapper">
      {selectedAlbum && (
        <div className="songcard-overlay">
          <div className="songcard-content">
            <button className="back-button" onClick={() => setSelectedAlbum(null)}>
              ← Back
            </button>
            <SongCard album={selectedAlbum} />
          </div>
        </div>
      )}
      <div className="soundwave-dots above">
        {/* Above dots */}
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="dot" style={{ "--i": index }}></span>
        ))}
      </div>

      <div className="soundwave-dots">
        {/* Middle dots */}
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="dot" style={{ "--i": index }}></span>
        ))}
      </div>

      <div className="soundwave-dots mirrored">
        {/* Mirrored dots */}
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="dot" style={{ "--i": index }}></span>
        ))}
      </div>

      <div className="browse-container">
        <div className="browse-rows">
          <div className="intro-section fade-in-active">
            <h1 className="intro-text">Explore New Vibes</h1>
            <p className="scroll-hint">Scroll to get started ↓</p>
          </div>

          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => (rowsRef.current[rowIndex] = el)}
              className="browse-row fade-in"
            >
              <h2 className="category-title">Category {rowIndex + 1}</h2>
              <div className="browse-scrollable">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className="browse-item"
                    onClick={() => setSelectedAlbum(album)}
                  >
                    <img src={album.image} alt={album.name} className="album-image" />
                    <p className="album-name">{album.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
