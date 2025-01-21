import React, { useEffect, useRef, useState } from "react";
import "./Browse.css";

import cover1 from "../../assets/cover1.jpeg";
import cover2 from "../../assets/cover2.jpeg";
import cover3 from "../../assets/cover3.jpeg";
import cover4 from "../../assets/cover4.jpeg";
import cover5 from "../../assets/cover5.jpeg";
import cover6 from "../../assets/cover6.jpeg";

// sample placeholder til we get api rolling
const albums = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  image: [cover1, cover2, cover3, cover4, cover5, cover6][index % 6],
  name: `Album ${index + 1}`,
}));

const Browse = () => {
  const rowsRef = useRef([]);
  const [introVisible, setIntroVisible] = useState(false);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIntroVisible(true);
    }, 300);

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setFadeOutIntro(true);
      } else {
        setFadeOutIntro(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-active");
          } else {
            entry.target.classList.remove("fade-in-active");
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    rowsRef.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => {
      rowsRef.current.forEach((row) => {
        if (row) observer.unobserve(row);
      });
    };
  }, []);

  return (
    <div className="browse-wrapper">
      <div className="soundwave-dots">
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="dot" style={{ "--i": index }}></span>
        ))}
      </div>

      <div className="browse-container">
        <div className="browse-rows">
          <div
            className={`intro-section ${introVisible ? "fade-in-active" : ""} ${
              fadeOutIntro ? "fade-out" : ""
            }`}
          >
            <h1 className="intro-text">Browse New Vibes</h1>
            <p className="scroll-hint">Scroll to get started ↓</p>
          </div>

          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => (rowsRef.current[rowIndex] = el)}
              className="browse-row fade-in"
            >
              <h2 className="category-title">Category {rowIndex + 1}</h2>
              <div className="browse-scrollable">
                {albums.map((album) => (
                  <div key={album.id} className="browse-item">
                    <img src={album.image} alt={album.name} className="album-image" />
                    <p className="album-name">{album.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
