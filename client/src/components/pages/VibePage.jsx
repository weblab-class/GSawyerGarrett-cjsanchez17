import React from "react";
import SearchBar from "../modules/SearchBar"; // Adjust the path if necessary
import "./VibePage.css"; // If you have a specific stylesheet for the page

const VibePage = () => {
  return (
    <div className="vibe-page">
      <h1 className="vibe-title">Vibe</h1>
      <SearchBar /> {/* Add the search bar */}
    </div>
  );
};

export default VibePage;
