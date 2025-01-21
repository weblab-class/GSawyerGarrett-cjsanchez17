import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <h1 className="NavBar-title">vibeCheck</h1>
      <div className="NavBar-linkContainer">
        <div className="NavBar-center">Search</div>
        <div className="NavBar-center">Browse</div>
        <div className="NavBar-center">Library</div>
      </div>

      <div className="NavBar-profileContainer">
        <Link to="/profile/" className="NavBar-profile">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
