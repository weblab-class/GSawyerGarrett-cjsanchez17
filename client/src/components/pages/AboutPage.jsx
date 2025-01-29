import React from "react";
import "./AboutPage.css";

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About vibeCheck</h1>

      {/* Intro Box */}
      <div className="about-intro-box">
        <p className="about-intro">
          <strong>vibeCheck</strong> is a new way to branch out and discover music.
        </p>
        <p className="about-text">
          Search <strong>vibes</strong> instead of genres, <strong>feelings</strong> instead of
          artists, and <strong>emotions</strong> instead of song names.
        </p>
        <p className="about-text">
          Have you ever wanted to find the perfect song to fit the mood you’re feeling but couldn’t?
          vibeCheck makes it possible!
        </p>
      </div>

      {/* Side-by-Side Layout (Stacked) */}
      <div className="about-sections">
        {/* How to Use Section */}
        <div className="about-section-box">
          <h2 className="about-subtitle">How to Use</h2>
          <p className="about-text">
            Instead of going down the rabbit hole of infinite playlists and lousy recommended songs,
            just type in <strong>exactly</strong> the vibe you’re looking for, and vibeCheck will
            handle the rest.
          </p>
          <p className="about-text">
            If the results of your search weren’t quite what you were looking for, add another
            descriptor or two. It will help hone in on the vibe you’re searching for.
          </p>
          <p className="about-text">
            If you’re just looking to branch out and see what’s out there, take a look at the
            <strong> Browse </strong> page for some preset searches to start with!
          </p>
        </div>

        {/* Our Model Section */}
        <div className="about-model-box">
          <h2 className="about-subtitle">Our Model</h2>
          <p className="about-text">
            (Insert details about how the recommendation model works, if applicable.)
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
