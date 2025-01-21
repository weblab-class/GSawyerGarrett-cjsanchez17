import React from "react";
import SearchBar from "../modules/SearchBar"; // Adjust the path if necessary
import "./VibePage.css"; // If you have a specific stylesheet for the page

const VibePage = () => {
  return (
    <div className="vibe-page">
      <div className="vibe-title"> What's the</div>
      <h1 classname="vibe-title-2">Vibe</h1>
      <SearchBar /> {/* Add the search bar */}
    </div>
  );
};

export default VibePage;
