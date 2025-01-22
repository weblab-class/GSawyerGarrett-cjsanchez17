import React, { useEffect, useState } from "react";
import SearchBar from "../modules/SearchBar";
import "./VibePage.css";
import searchIcon from "../../assets/magnifying_glass.png";

const CLIENT_ID = "c708b6906aeb425ab539cf51c38157d4";
const CLIENT_SECRET = "5a1c3ea5e2de419b91b640b371a6149d";

const VibePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [albumCovers, setAlbumCovers] = useState([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });

        const data = await response.json();
        return data.access_token;
      } catch (error) {
        console.error("Error fetching access token:", error);
        return null;
      }
    };

    const fetchAlbumCovers = async () => {
      const accessToken = await fetchAccessToken();
      if (!accessToken) {
        console.error("Failed to get access token");
        return;
      }

      try {
        const response = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=30", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (data.albums && data.albums.items) {
          const covers = data.albums.items.map((album) => album.images[0]?.url);
          setAlbumCovers(covers);
        }
      } catch (error) {
        console.error("Error fetching album covers:", error);
      }
    };

    fetchAlbumCovers();
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <div className={`vibe-wrapper ${loaded ? "fade-in" : ""}`}>
      <div className="background">
        <div className="animated-grid">
          {albumCovers.length > 0 ? (
            albumCovers.map((cover, index) => (
              <div
                key={index}
                className="grid-cell"
                style={{ backgroundImage: `url(${cover})` }}
              ></div>
            ))
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>Loading album covers...</p>
          )}
        </div>
        <div className="grid-overlay"></div>
      </div>

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
