import React, { useEffect, useRef, useState, useContext } from "react";
import "./Browse.css";
import SongCard from "../modules/SongCard"; // Import SongCard component
import axios from "axios";
import { post } from "../../utilities"; // Import post function
import { UserContext } from "../App"; // Get user info

const allPresetSearches = [
  { title: "Summer morning chill", query: "summer morning chill" },
  { title: "Dark heavy rock", query: "dark heavy rock" },
  { title: "Underwater techno", query: "underwater techno" },
  { title: "Midnight jazz lounge", query: "midnight jazz lounge" },
  { title: "Neon city pop", query: "neon city pop" },
  { title: "Cozy coffee house", query: "cozy coffee house" },
  { title: "Rainy day dreams", query: "rainy day dreams" },
  { title: "Desert sunset", query: "desert sunset" },
  { title: "Forest meditation", query: "forest meditation" },
  { title: "Urban underground", query: "urban underground" },
  { title: "Crystal cave ambient", query: "crystal cave ambient" },
  { title: "Tropical beach party", query: "tropical beach party" },
  { title: "Misty mountain folk", query: "misty mountain folk" },
  { title: "Cosmic space drift", query: "cosmic space drift" },
  { title: "Dusty vinyl lounge", query: "dusty vinyl lounge" },
  { title: "Neon synthwave", query: "neon synthwave" },
  { title: "Moonlit piano", query: "moonlit piano" },
  { title: "Golden hour acoustic", query: "golden hour acoustic" },
  { title: "Deep jungle drums", query: "deep jungle drums" },
  { title: "Arctic wind ambient", query: "arctic wind ambient" },
  { title: "Sunset boulevard jazz", query: "sunset boulevard jazz" },
  { title: "Cyberpunk streets", query: "cyberpunk streets" },
  { title: "Mountain top wisdom", query: "mountain top wisdom" },
  { title: "Velvet soul groove", query: "velvet soul groove" },
  { title: "Tokyo night drive", query: "tokyo night drive" },
  { title: "Ocean floor beats", query: "ocean floor beats" },
  { title: "Campfire stories", query: "campfire stories" },
  { title: "Starlit classical", query: "starlit classical" },
  { title: "Hidden temple drums", query: "hidden temple drums" },
  { title: "Neon rain synthpop", query: "neon rain synthpop" },
  { title: "Desert caravan", query: "desert caravan" },
  { title: "Frozen lake echo", query: "frozen lake echo" },
  { title: "Volcanic bass", query: "volcanic bass" },
  { title: "Autumn leaf jazz", query: "autumn leaf jazz" },
  { title: "Retro arcade wave", query: "retro arcade wave" },
  { title: "Bamboo forest zen", query: "bamboo forest zen" },
  { title: "Storm cloud metal", query: "storm cloud metal" },
  { title: "Silk road dreams", query: "silk road dreams" },
  { title: "Lunar garden ambient", query: "lunar garden ambient" },
  { title: "Savage jungle bass", query: "savage jungle bass" },
  { title: "Neon sunset drive", query: "neon sunset drive" },
  { title: "Ancient temple echoes", query: "ancient temple echoes" },
  { title: "Midnight forest rave", query: "midnight forest rave" },
  { title: "Desert wind trance", query: "desert wind trance" },
  { title: "Ethereal dream pop", query: "ethereal dream pop" },
  { title: "Volcanic jungle drums", query: "volcanic jungle drums" },
  { title: "Arctic aurora ambient", query: "arctic aurora ambient" },
  { title: "Underground bass cave", query: "underground bass cave" },
  { title: "Celestial harp dreams", query: "celestial harp dreams" },
  { title: "Mystic desert winds", query: "mystic desert winds" },
  { title: "Cyber alley synthwave", query: "cyber alley synthwave" },
  { title: "Crystal waterfall zen", query: "crystal waterfall zen" },
  { title: "Savage metal storm", query: "savage metal storm" },
  { title: "Midnight jazz cafe", query: "midnight jazz cafe" },
  { title: "Neon ghost dance", query: "neon ghost dance" },
  { title: "Ocean cave ambient", query: "ocean cave ambient" },
  { title: "Mountain storm metal", query: "mountain storm metal" },
  { title: "Dystopian city beats", query: "dystopian city beats" },
  { title: "Zen garden dreams", query: "zen garden dreams" },
  { title: "Volcanic bass cave", query: "volcanic bass cave" },
];

const ITEMS_PER_PAGE = 1;

const getNextPrompts = (startIndex) => {
  const wrappedIndex = startIndex % allPresetSearches.length;
  const endIndex = wrappedIndex + ITEMS_PER_PAGE;

  if (endIndex <= allPresetSearches.length) {
    return allPresetSearches.slice(wrappedIndex, endIndex);
  } else {
    // If we need to wrap around to the start of the array
    const firstPart = allPresetSearches.slice(wrappedIndex);
    const remainingCount = ITEMS_PER_PAGE - firstPart.length;
    const secondPart = allPresetSearches.slice(0, remainingCount);
    return [...firstPart, ...secondPart];
  }
};
const CLIENT_ID = "f29a728065c147a1b8b7dcb81712fe6b";
const CLIENT_SECRET = "77672cc851f14b1582f45905873c38fb";

// const CLIENT_ID = "c708b6906aeb425ab539cf51c38157d4";
// const CLIENT_SECRET = "5a1c3ea5e2de419b91b640b371a6149d";

const Browse = () => {
  const { userId } = useContext(UserContext); // Get logged-in user ID\
  const rowsRef = useRef([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [categoryResults, setCategoryResults] = useState({});
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [presetSearches, setPresetSearches] = useState(() => {
    const savedIndex = parseInt(localStorage.getItem("browseStartIndex") || "0");
    return getNextPrompts(savedIndex);
  });

  // Update localStorage for next page load
  useEffect(() => {
    const savedIndex = parseInt(localStorage.getItem("browseStartIndex") || "0");
    localStorage.setItem(
      "browseStartIndex",
      (savedIndex + ITEMS_PER_PAGE) % allPresetSearches.length
    );
  }, []);

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
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const fetchCategoryResults = async () => {
      for (let i = 0; i < 1; i++) {
        setCurrentLoadingIndex(i);
        const category = presetSearches[i];
        try {
          const recommendResponse = await axios.get("https://vibecheckapi.com/recommend/", {
            params: { query: category.query },
          });

          if (recommendResponse.data && recommendResponse.data.results) {
            const songs = recommendResponse.data.results;
            const details = [];
            const topSongs = songs.slice(0, 6);
            for (const song of topSongs) {
              const [track, artistPart] = song.entity.split(" by ");
              const [artist] = artistPart.split(" from ");

              try {
                const spotifyResponse = await axios.get("https://api.spotify.com/v1/search", {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                  params: {
                    q: `track:${track.trim()} artist:${artist.trim()}`,
                    type: "track",
                    limit: 1,
                  },
                });
                if (spotifyResponse.data.tracks.items.length > 0) {
                  const track = spotifyResponse.data.tracks.items[0];
                  const spotifyUrl = track.external_urls.spotify;

                  // Fetch oEmbed HTML for the song
                  const oEmbedResponse = await axios.get("https://open.spotify.com/oembed", {
                    params: { url: spotifyUrl },
                  });

                  details.push({
                    id: track.id,
                    name: track.name,
                    artist: track.artists.map((artist) => artist.name).join(", "),
                    releaseDate: track.album.release_date,
                    albumCover: track.album.images[0]?.url || "",
                    previewUrl: track.preview_url || "",
                    spotifyUrl: track.external_urls.spotify,
                    embedHtml: oEmbedResponse.data.html, // Embed HTML for song
                  });
                }
              } catch (error) {
                console.error(`Error searching for song "${song.entity}":`, error);
              }
            }
            setCategoryResults((prev) => ({
              ...prev,
              [category.title]: details,
            }));
          }
        } catch (error) {
          console.error(`Error fetching results for ${category.title}:`, error);
        }
        // Add a delay between categories
        // await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    fetchCategoryResults();
  }, [accessToken, presetSearches]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting
            ? entry.target.classList.add("fade-in-active")
            : entry.target.classList.remove("fade-in-active");
        });
      },
      { threshold: 0.6 }
    );

    const introSection = document.querySelector(".intro-section");
    if (introSection) observer.observe(introSection);

    rowsRef.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => {
      rowsRef.current.forEach((row) => {
        if (row) observer.unobserve(row);
      });
    };
  }, []);

  const LoadingItem = () => (
    <div className="browse-item loading">
      <div className="loading-album-image"></div>
      <div className="loading-album-name"></div>
    </div>
  );

  const handleSelectAlbum = (album, categoryTitle) => {
    setSelectedAlbum(album);
    setSelectedCategory(categoryTitle);
    const categoryAlbums = categoryResults[categoryTitle];
    const index = categoryAlbums.findIndex((a) => a.id === album.id);
    setCurrentIndex(index);
    setShowOverlay(true);
  };

  const handleNext = () => {
    if (!selectedCategory || !categoryResults[selectedCategory]) return;
    const categoryAlbums = categoryResults[selectedCategory];
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categoryAlbums.length);
  };

  const handlePrevious = () => {
    if (!selectedCategory || !categoryResults[selectedCategory]) return;
    const categoryAlbums = categoryResults[selectedCategory];
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categoryAlbums.length) % categoryAlbums.length);
  };

  const handleClose = () => {
    setShowOverlay(false);
    setSelectedAlbum(null);
    setSelectedCategory(null);
    setCurrentIndex(0);
  };

  const saveToLibrary = async (album) => {
    if (!userId) {
      alert("You need to log in to save songs.");
      return;
    }

    const songData = {
      track: album.name,
      artist: album.artist,
      vibe: selectedCategory, // Save the searched vibe
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
    <div className="browse-wrapper">
      {showOverlay && selectedCategory && categoryResults[selectedCategory] && (
        <SongCard
          album={categoryResults[selectedCategory][currentIndex]}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
          query={selectedCategory}
          onSave={saveToLibrary}
          currentIndex={currentIndex}
          totalTracks={categoryResults[selectedCategory].length}
        />
      )}

      <div className="soundwave-dots above">
        {/* Above dots */}
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="dot" style={{ "--i": index }}></span>
        ))}
      </div>

      <div className="soundwave-dots">
        {/* Middle dots */}
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="dot" style={{ "--i": index }}></span>
        ))}
      </div>

      <div className="soundwave-dots mirrored">
        {/* Mirrored dots */}
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="dot" style={{ "--i": index }}></span>
        ))}
      </div>

      <div className="browse-container">
        <div className="browse-rows">
          <div className="intro-section fade-in-active">
            <h1 className="intro-text">Explore New Vibes</h1>
            <p className="scroll-hint">Scroll to get started ↓</p>
          </div>

          {presetSearches.map((category, index) => (
            <div
              key={index}
              ref={(el) => (rowsRef.current[index] = el)}
              className="browse-row fade-in"
            >
              <h2 className="category-title">{category.title}</h2>
              <div className="browse-scrollable">
                {Array.from(new Set(categoryResults[category.title]?.map((album) => album.id)))
                  .map((id) => categoryResults[category.title].find((album) => album.id === id))
                  .map((album) => (
                    <div
                      key={album.id}
                      className="browse-item"
                      onClick={() => handleSelectAlbum(album, category.title)}
                    >
                      <img src={album.albumCover} alt={album.name} className="album-image" />
                      <p className="album-name">{album.name}</p>
                    </div>
                  ))}
                {!categoryResults[category.title] &&
                  Array.from({ length: 20 }).map((_, i) => <LoadingItem key={i} />)}
              </div>
            </div>
          ))}

          <div className="refresh-row fade-in" onClick={() => window.location.reload()}>
            <span>Refresh the page for more vibes</span>
            <span className="refresh-icon">↻</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
