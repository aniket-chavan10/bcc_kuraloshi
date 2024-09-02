import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import LatestNews from "../components/LatestNews";
import Gallery from "../components/Gallery";
import InstaFeed from "../components/InstaFeed";
import Players from "../components/Players";
import PlayerOfMonth from "../components/PlayerOfMonth";
import Footer from "../components/Footer";
import MainLayout from "../components/MainLayout";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const loadingText = [
  "Polishing the cricket bats...",
  "Double-checking the bails...",
  "Waiting for the umpire's nod...",
  "Grabbing a cup of chai...",
  "Fetching runs... Stay tuned!",
  "Developer is squeezing every last bit of free hosting...",
  "Deploying... with the same speed as your internet!",
  "Optimizing... because free resources need extra love!",
  "This spinner is taking its time... hold tight!",
  "Loading... slower than a Test match's first innings!"
];

const LOADER_DURATION = 3000; // Duration in milliseconds (e.g., 3000ms = 3 seconds)

function Home() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState({
    mainLayout: false,
    latestNews: false,
    players: false,
    gallery: false,
    playerOfMonth: false,
    instaFeed: false,
    footer: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADER_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const handleComponentLoaded = (component) => {
    setComponentsLoaded((prev) => ({ ...prev, [component]: true }));
  };

  const randomText = loadingText[Math.floor(Math.random() * loadingText.length)];

  return (
    <div className="relative">
      <Navbar />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <Loader />
          <p className="md:text-lg text-sm font-semibold text-gray-800">{randomText}</p>
        </div>
      ) : (
        <div ref={mainRef}>
          {/* Components start rendering as soon as isLoading is false */}
          <MainLayout onLoad={() => handleComponentLoaded("mainLayout")} />
          <LatestNews onLoad={() => handleComponentLoaded("latestNews")} />
          <Players onLoad={() => handleComponentLoaded("players")} />
          <Gallery onLoad={() => handleComponentLoaded("gallery")} />
          <PlayerOfMonth onLoad={() => handleComponentLoaded("playerOfMonth")} />
          <InstaFeed onLoad={() => handleComponentLoaded("instaFeed")} />
          <Footer onLoad={() => handleComponentLoaded("footer")} />
        </div>
      )}
    </div>
  );
}

export default Home;
