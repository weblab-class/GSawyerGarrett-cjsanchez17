import React, { useEffect, useState } from "react";
import SearchBar from "../modules/SearchBar";
import "./VibePage.css";
import searchIcon from "../../assets/magnifying_glass.png";
import axios from "axios";

const CLIENT_ID = "c708b6906aeb425ab539cf51c38157d4";
const CLIENT_SECRET = "5a1c3ea5e2de419b91b640b371a6149d";

const VibePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [albumCovers, setAlbumCovers] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSearch = async () => {
    if (!query.trim()) return;
    setResults([]); // Clear previous results
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://18.219.58.154:8000/recommend/", {
        params: { query },
      });

      if (response.data && response.data.results && Array.isArray(response.data.results)) {
        setResults(response.data.results);
      } else {
        throw new Error("Unexpected API response format.");
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to fetch recommendations. Try again.");
    }

    setLoading(false);
  };

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

        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search the vibe you want to explore..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch} disabled={loading}>
              <img src={searchIcon} alt="Search" />
            </button>
          </div>

          {loading && <p className="loading-text">Searching...</p>}
          {error && <p className="error-text">{error}</p>}

          <ul className="results-list">
            {results.length > 0 ? (
              results.map((item, index) => (
                <li key={index} className="result-item">
                  {item.entity} - Score: {item.score.toFixed(4)}
                </li>
              ))
            ) : (
              <p className="no-results">Enter a search term to explore music recommendations.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VibePage;
