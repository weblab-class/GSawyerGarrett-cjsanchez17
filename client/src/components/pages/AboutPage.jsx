import React from "react";
import "./AboutPage.css";
import { Link } from "react-router-dom";
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
            We built a word embedding model to generate a music recommendation system. We used a
            pretrained dataset containing vector mappings for a heavily musical vocabulary.
            Realizing that this wasn't enough, we trained our own model on 37 of the most popular
            music subreddits. Our model generates a combined embedding for your queries which then
            finds the songs that best match your vibe, thanks to a large dataset of song-vector
            mappings. In simple terms, search whatever vibe you want to hear and we'll try our best
            to find songs that match it!
          </p>
          <p className="about-text">
            Link to Code:
            <Link to="https://github.com/cjsanchez17/vibe">
              https://github.com/cjsanchez17/vibe
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
