import React, { useEffect, useState, useContext, useRef } from "react";
import "./VibePage.css";
import searchIcon from "../../assets/magnifying_glass.png";
import axios from "axios";
import SongCard from "../modules/SongCard";
import { post } from "../../utilities"; // Import post function
import { UserContext } from "../App"; // Get user info
import album1 from "../../assets/album1.webp";
import album2 from "../../assets/album2.webp";
import album3 from "../../assets/album3.webp";
import album4 from "../../assets/album4.webp";
import album5 from "../../assets/album5.webp";
import album6 from "../../assets/album6.webp";
import album7 from "../../assets/album7.webp";
import album8 from "../../assets/album8.webp";
import album9 from "../../assets/album9.webp";
import album10 from "../../assets/album10.webp";
import album11 from "../../assets/album11.webp";
import album12 from "../../assets/album12.webp";
import album13 from "../../assets/album13.webp";
import album14 from "../../assets/album14.webp";
import album15 from "../../assets/album15.webp";
import album16 from "../../assets/album16.webp";
import album17 from "../../assets/album17.webp";
import album18 from "../../assets/album18.webp";
import album19 from "../../assets/album19.webp";
import album20 from "../../assets/album20.webp";
import album21 from "../../assets/album21.webp";
import album22 from "../../assets/album22.webp";
import album23 from "../../assets/album23.webp";
import album24 from "../../assets/album24.webp";
import album25 from "../../assets/album25.webp";
import album26 from "../../assets/album26.webp";
import album27 from "../../assets/album27.webp";
import album28 from "../../assets/album28.webp";
import album29 from "../../assets/album29.webp";
import album30 from "../../assets/album30.webp";

const ALBUM_COVERS = [
  album1,
  album2,
  album3,
  album4,
  album5,
  album6,
  album7,
  album8,
  album9,
  album10,
  album11,
  album12,
  album13,
  album14,
  album15,
  album16,
  album17,
  album18,
  album19,
  album20,
  album21,
  album22,
  album23,
  album24,
  album25,
  album26,
  album27,
  album28,
  album29,
  album30,
];

// const CLIENT_ID = "d88a9210148347c5a18105a754470b24"; fallback 1
// const CLIENT_SECRET = "403fa463caf448c196a673e3094c6712"; fallback 1

const CLIENT_ID = "49c10d34570d4ed481fc310c7a6c0788";
const CLIENT_SECRET = "7e0c15fcf052455ebb441d983a533307";

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
  useEffect(() => {
    const shuffledCovers = [...ALBUM_COVERS].sort(() => 0.5 - Math.random()).slice(0, 30);
    setAlbumCovers(shuffledCovers);
  }, []);
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
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cancelTokenRef = useRef(null); // Store cancel token persistently

  // import { useRef } from "react"; // Import useRef to persist cancel token across renders

  // const cancelTokenRef = useRef(null); // Store cancel token persistently
  let requestCount = 0; // 🔥 Track API requests

  const fetchSongDetails = async (songs) => {
    if (!accessToken) return;

    let firstResultShown = false;

    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("User navigated back, stopping requests.");
    }

    cancelTokenRef.current = axios.CancelToken.source();

    setCurrentIndex(0);
    setSongDetails([]);
    setShowOverlay(false);
    requestCount = 0; // Reset request count
    const topSongs = songs.slice(0, 10);
    for (const song of topSongs) {
      const [track, artistPart] = song.entity.split(" by ");
      const [artist] = artistPart.split(" from ");

      try {
        requestCount++;
        console.log(` Request #${requestCount}: Searching for "${track} by ${artist}"`);

        const spotifyResponse = await axios.get("https://api.spotify.com/v1/search", {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { q: `track:${track.trim()} artist:${artist.trim()}`, type: "track", limit: 1 },
          cancelToken: cancelTokenRef.current.token,
        });

        if (spotifyResponse.data.tracks.items.length > 0) {
          const trackData = spotifyResponse.data.tracks.items[0];
          const spotifyUrl = trackData.external_urls.spotify;

          const oEmbedResponse = await axios.get("https://open.spotify.com/oembed", {
            params: { url: spotifyUrl },
            cancelToken: cancelTokenRef.current.token,
          });

          const songDetail = {
            name: trackData.name,
            artist: trackData.artists.map((artist) => artist.name).join(", "),
            releaseDate: trackData.album.release_date,
            albumCover: trackData.album.images[0]?.url || "",
            previewUrl: trackData.preview_url || "",
            spotifyUrl: spotifyUrl,
            embedHtml: oEmbedResponse.data.html,
          };

          setSongDetails((prevDetails) => [...prevDetails, songDetail]);

          if (!firstResultShown) {
            setShowOverlay(true);
            firstResultShown = true;
          }
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(`⏹ Request #${requestCount} cancelled: "${song.entity}"`);
          return;
        } else {
          console.error(`Error in request #${requestCount} for "${song.entity}":`, error);
        }
      }

      await delay(2500); // Keep rate limit protection
    }

    console.log(`Total API Requests Made: ${requestCount}`);
  };

  const handleClose = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("User navigated back, stopping requests.");
    }
    setShowOverlay(false);
    setSongDetails([]); // Clear results immediately
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songDetails.length);
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
              placeholder="Search any music vibe you want to explore..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
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
