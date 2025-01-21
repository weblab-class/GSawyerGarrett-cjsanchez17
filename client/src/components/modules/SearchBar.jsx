import React, { useState } from "react";
import "./SearchBar.css"; // Ensure this path is correct

/**
 * The search bar that is centered on the page.
 */
const SearchBar = () => {
  const [query, setQuery] = useState(""); // State to store the search input

  // Handle the input change event
  const handleInputChange = (event) => {
    setQuery(event.target.value); // Update state with input value
  };

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form default behavior (page reload)
    console.log("Search query:", query); // Example: Log or do something with the query
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder=""
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
