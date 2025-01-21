import React from "react";
import "./Browse.css";

// Import images
import cover1 from "../../assets/cover1.jpeg";
import cover2 from "../../assets/cover2.jpeg";
import cover3 from "../../assets/cover3.jpeg";
import cover4 from "../../assets/cover4.jpeg";
import cover5 from "../../assets/cover5.jpeg";
import cover6 from "../../assets/cover6.jpeg";

// Sample data with 20 items per row
const albums = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  image: [cover1, cover2, cover3, cover4, cover5, cover6][index % 6], // Rotate through images
  name: `Album ${index + 1}`,
}));

const Browse = () => {
  return (
    <div className="browse-wrapper">
      {/* Bouncing dots soundwave */}
      <div className="soundwave-dots">
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="dot" style={{ "--i": index }}></span>
        ))}
      </div>

      {/* Main Content */}
      <div className="browse-container">
        <div className="browse-rows">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="browse-row">
              <h2 className="category-title">Category {rowIndex + 1}</h2>
              <div className="browse-scrollable">
                {albums.map((album) => (
                  <div key={album.id} className="browse-item">
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
