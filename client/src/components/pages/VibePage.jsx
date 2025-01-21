import React from "react";
import SearchBar from "../modules/SearchBar"; // Adjust the path if necessary
import "./VibePage.css"; // If you have a specific stylesheet for the page
import searchIcon from "../../assets/magnifying_glass.png";

import cover1 from "/Users/sawyergarrett/Desktop/vibe/GSawyerGarrett-cjsanchez17/client/src/assets/cover1.jpeg";
import cover2 from "/Users/sawyergarrett/Desktop/vibe/GSawyerGarrett-cjsanchez17/client/src/assets/cover2.jpeg";
import cover3 from "/Users/sawyergarrett/Desktop/vibe/GSawyerGarrett-cjsanchez17/client/src/assets/cover3.jpeg";
import cover4 from "/Users/sawyergarrett/Desktop/vibe/GSawyerGarrett-cjsanchez17/client/src/assets/cover4.jpeg";
import cover5 from "/Users/sawyergarrett/Desktop/vibe/GSawyerGarrett-cjsanchez17/client/src/assets/cover5.jpeg";
import cover6 from "/Users/sawyergarrett/Desktop/vibe/GSawyerGarrett-cjsanchez17/client/src/assets/cover6.jpeg";

const images = [cover1, cover2, cover3, cover4, cover5, cover6];

const VibePage = () => {
  return (
    <div className="vibe-wrapper">
      {/* Background animation */}
      <div className="background">
        <div className="animated-grid">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="grid-cell"
              style={{ backgroundImage: `url(${images[index % images.length]})` }}
            ></div>
          ))}
        </div>
        <div className="grid-overlay"></div>
      </div>

      {/* Foreground content */}
      <div className="vibe-content">
        <h1 className="vibe-title">
          <span className="vibe-line">What's the</span>
          <span className="vibe-highlight">VIBE?</span>
        </h1>
        <div className="search-bar">
          <input type="text" placeholder="Search the vibe you want to explore..." />
          <button className="search-btn">🔍</button>
        </div>
      </div>
    </div>
  );
};

export default VibePage;
