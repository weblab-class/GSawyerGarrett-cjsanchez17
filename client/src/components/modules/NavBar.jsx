import { Link } from "react-router-dom";

import "./NavBar.css";
import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import { UserContext } from "../App";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <nav className="NavBar-container">
      <h1 className="NavBar-title">vibeCheck</h1>
      <div className="NavBar-linkContainer">
        <Link to="/browse" className="NavBar-center">
          Browse
        </Link>
        <Link to="/library" className="NavBar-center">
          Library
        </Link>
        <Link to="/profile" className="NavBar-center">
          Profile
        </Link>

        <div className="NavBar-authContainer">
          {userId ? (
            <button
              className="NavBar-logoutText"
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin
              onSuccess={handleLogin}
              onError={(err) => console.log(err)}
              shape="pill"
              size="medium"
              theme="filled_black"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
