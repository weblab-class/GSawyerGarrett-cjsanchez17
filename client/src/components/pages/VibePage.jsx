import React, { useEffect, useState, useContext } from "react";
import "./VibePage.css";
import searchIcon from "../../assets/magnifying_glass.png";
import axios from "axios";
import SongCard from "../modules/SongCard";
import { post } from "../../utilities"; // Import post function
import { UserContext } from "../App"; // Get user info

const CLIENT_ID = "c708b6906aeb425ab539cf51c38157d4";
const CLIENT_SECRET = "5a1c3ea5e2de419b91b640b371a6149d";

const VibePage = () => {
  const { userId } = useContext(UserContext); // Get logged-in user ID
  const [loaded, setLoaded] = useState(false);
  const [albumCovers, setAlbumCovers] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [songDetails, setSongDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [randomWord, setRandomWord] = useState("Searching");

  const loadingPhrases = [
    "Navigating the multiverse of music",
    "Doing some heavy lifting",
    "Searching the wormholes for your query",
    "It'll take a sec",
    "Vibe-checking",
    "Synthesizing sound waves",
    "Doing a quick mental calculation",
    "Finding the derivative",
    "Vector mapping your vibe",
    "Just watch this ^ while you wait",
    "Searching for who asked",
  ];
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
        setError("Failed to fetch access token.");
      }
    };

    fetchAccessToken();
  }, []);
  useEffect(() => {
    const fetchAlbumCovers = async () => {
      if (!accessToken) return;
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases?limit=30",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.albums && response.data.albums.items) {
          const covers = response.data.albums.items.map((album) => album.images[0]?.url);
          setAlbumCovers(covers);
        }
      } catch (error) {
        console.error("Error fetching album covers:", error);
        setError("Failed to load album covers.");
      }
    };

    if (accessToken) {
      fetchAlbumCovers();
      setTimeout(() => setLoaded(true), 200);
    }
  }, [accessToken]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    // Randomize the loading word
    const randomPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
    setRandomWord(randomPhrase);

    setResults([]);
    setSongDetails([]);
    setLoading(true); // Start the loading animation
    setError(null);

    try {
      // Fetch recommended song names from your API
      const response = await axios.get("https://vibecheckapi.com/recommend/", {
        params: { query },
      });

      if (response.data && response.data.results && Array.isArray(response.data.results)) {
        setResults(response.data.results);
        await fetchSongDetails(response.data.results); // Wait for all details to load
      } else {
        throw new Error("Unexpected API response format.");
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to fetch recommendations. Try again.");
    } finally {
      setLoading(false); // Stop the loading animation after everything is done
    }
  };

  const fetchSongDetails = async (songs) => {
    const details = [];

    for (const song of songs) {
      const [track, artistPart] = song.entity.split(" by ");
      const [artist] = artistPart.split(" from ");

      try {
        const spotifyResponse = await axios.get("https://api.spotify.com/v1/search", {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { q: `track:${track.trim()} artist:${artist.trim()}`, type: "track", limit: 1 },
        });

        if (spotifyResponse.data.tracks.items.length > 0) {
          const track = spotifyResponse.data.tracks.items[0];
          details.push({
            name: track.name,
            artist: track.artists.map((artist) => artist.name).join(", "),
            releaseDate: track.album.release_date,
            albumCover: track.album.images[0]?.url || "",
            previewUrl: track.preview_url || "",
            spotifyUrl: track.external_urls.spotify, // Spotify track URL
          });
        }
      } catch (error) {
        console.error(`Error searching for song "${song.entity}":`, error);
      }
    }

    setSongDetails(details);
    setShowOverlay(true);
    setCurrentIndex(0);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songDetails.length);
  };

  const handleClose = () => {
    setShowOverlay(false);
  };

  const saveToLibrary = async (album) => {
    if (!userId) {
      alert("You need to log in to save songs.");
      return;
    }

    const songData = {
      track: album.name,
      artist: album.artist,
      vibe: query, // Save the searched vibe
      cover: album.albumCover,
    };

    try {
      await post("/api/library", songData);
      alert(`"${album.name}" has been saved to your library!`);
    } catch (err) {
      console.error("Error saving song:", err);
      alert("Failed to save song.");
    }
  };

  return (
    <div className="vibe-wrapper ">
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
          {/* Loading spinner with randomized word */}
          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>
                {randomWord}
                <span className="dots-animation">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </p>
            </div>
          )}
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>

      {showOverlay && songDetails.length > 0 && (
        <SongCard
          album={songDetails[currentIndex]}
          query={query}
          currentIndex={currentIndex}
          totalTracks={songDetails.length}
          onSave={saveToLibrary}
          onClose={handleClose}
          onNext={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % songDetails.length)} // Next song
          onPrevious={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex - 1 + songDetails.length) % songDetails.length
            )
          } // Previous song
        />
      )}
    </div>
  );
};

export default VibePage;
