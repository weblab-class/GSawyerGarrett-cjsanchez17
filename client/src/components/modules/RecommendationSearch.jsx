import React, { useState } from "react";
import axios from "axios";

const RecommendationSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
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
      setError("Failed to fetch recommendations.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Music Recommendation</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter music genre..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {item.entity} - Score: {item.score.toFixed(4)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationSearch;
