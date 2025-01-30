import React, { useState } from "react";
import "./SearchBar.css"; // Ensure this path is correct

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Handle the input change event
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form default behavior (page reload)
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search the vibe you want to explore..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
