import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// Import components directly (not lazy-loaded)
import LatestNews from "../components/LatestNews";
import Gallery from "../components/Gallery";
import InstaFeed from "../components/InstaFeed";
import Players from "../components/Players";
import PlayerOfMonth from "../components/PlayerOfMonth";
import Footer from "../components/Footer";
import MainLayout from "../components/MainLayout";
import Navbar from "../components/Navbar";

function Home() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(false);
  }, [location]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar /> {/* Render Navbar */}
        <div className="flex-grow flex items-center justify-center">
          {/* You can replace the loader with a placeholder or leave it empty */}
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar /> {/* Render Navbar */}
      <div ref={mainRef}>
        <MainLayout />
        <LatestNews />
        <Players />
        <Gallery />
        <PlayerOfMonth />
        <InstaFeed />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
