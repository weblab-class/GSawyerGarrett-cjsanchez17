import React from "react";
import SearchBar from "../modules/SearchBar"; // Adjust the path if necessary
import "./VibePage.css"; // If you have a specific stylesheet for the page
import searchIcon from "../../assets/magnifying_glass.png";
const VibePage = () => {
  return (
    <div className="vibe-wrapper">
      <div className="vibe-content">
        <h1 className="vibe-title">
          <span className="vibe-line">What's the</span>
          <span className="vibe-highlight">VIBE?</span>
        </h1>
        <div className="search-bar">
          <input type="text" placeholder="Search the vibe you want to explore..." />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VibePage;
