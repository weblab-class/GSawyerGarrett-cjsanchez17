import React, { useEffect, useState, useRef } from "react";
import "./Profile.css";
import { UserContext } from "../App";
import { get } from "../../utilities"; // Import post function

const Profile = () => {
  const profileRef = useRef(null);
  const [user, setUser] = useState(null);
  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateEyeMovement = (eyeOffsetX, eyeOffsetY) => {
    if (!profileRef.current) return { transform: "translate(0px, 0px)" };

    // Get profile circle position and dimensions
    const profileRect = profileRef.current.getBoundingClientRect();
    const profileCenterX = profileRect.left + profileRect.width / 2;
    const profileCenterY = profileRect.top + profileRect.height / 2;

    // Calculate the eye center by adding the offsets
    const eyeCenterX = profileCenterX + eyeOffsetX;
    const eyeCenterY = profileCenterY + eyeOffsetY;

    // Calculate distance between mouse and eye
    const dx = mousePosition.x - eyeCenterX;
    const dy = mousePosition.y - eyeCenterY;
    const angle = Math.atan2(dy, dx);
    const maxDistance = 10;

    return {
      transform: `translate(${Math.cos(angle) * maxDistance}px, ${
        Math.sin(angle) * maxDistance
      }px)`,
    };
  };

  // Generate grid lines
  const generateGrid = () => {
    return Array.from({ length: 200 }).map((_, i) => <div key={i} className="grid-line"></div>);
  };

  const generateInvertedGrid = () => {
    return Array.from({ length: 200 }).map((_, i) => (
      <div key={`inv-${i}`} className="inverted-grid-line"></div>
    ));
  };

  useEffect(() => {
    get("/api/whoami")
      .then((user) => {
        setUser(user);
        return get("/api/recentSearch"); // Fetch the recent search after user data is fetched
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading if user info is not available
  }

  return (
    <div className="profile-wrapper">
      <div className="grid-background">{generateGrid()}</div>
      <div className="inverted-grid-background">{generateInvertedGrid()}</div>
      <div className="profile-circle" ref={profileRef}>
        <div className="avatar">
          <div className="head">
            <div className="eye-container">
              <div className="eye">
                <div className="pupil" style={calculateEyeMovement(-35, -10)}></div>
              </div>
              <div className="eye">
                <div className="pupil" style={calculateEyeMovement(35, -10)}></div>
              </div>
            </div>
          </div>
          <div className="body"></div>
        </div>
      </div>
      <div className="profile-text">
        <h2>{user.name || "Guest"}</h2>
        <p> Certified Viber: Yes</p>
      </div>
    </div>
  );
};

export default Profile;
