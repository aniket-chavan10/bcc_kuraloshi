import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import LatestNews from "../components/LatestNews";
import Gallery from "../components/Gallery";
import Players from "../components/Players";
import PlayerOfMonth from "../components/PlayerOfMonth";
import InstaFeed from "../components/InstaFeed";
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
  "Loading... slower than a Test match's first innings!",
];

const LOADER_DURATION = 10000; // Duration in milliseconds (10 seconds)

function Home() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState({
    mainLayout: false,
    latestNews: false,
    players: false,
    gallery: false,
    playerOfMonth: false,
    footer: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const hasLoadedBefore = sessionStorage.getItem("hasLoadedHome");

    if (!hasLoadedBefore) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoadedHome", "true");
      }, LOADER_DURATION);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const allComponentsLoaded = Object.values(componentsLoaded).every(Boolean);
    if (allComponentsLoaded) {
      setIsLoading(false);
    }
  }, [componentsLoaded]);

  const handleComponentLoaded = (component) => {
    setComponentsLoaded((prev) => ({ ...prev, [component]: true }));
  };

  const randomText =
    loadingText[Math.floor(Math.random() * loadingText.length)];

  return (
    <div className="relative">
      <Helmet>
        <title>
          Bhairavnath Cricket Club Kuraloshi - Latest News, Player Rankings &
          Gallery
        </title>
        <meta
          name="description"
          content="Explore Bhairavnath Cricket Club Kuraloshi's official website. Stay updated with the latest cricket news, player rankings, exclusive gallery, and player of the month highlights. Follow live updates and join our cricketing community!"
        />
        <meta
          name="keywords"
          content="Bhairavnath Cricket Club, Kuraloshi, cricket news, player rankings, cricket gallery, player of the month, live updates, cricket community"
        />
        <meta
          property="og:title"
          content="Bhairavnath Cricket Club Kuraloshi - Latest News & Player Rankings"
        />
        <meta
          property="og:description"
          content="Discover the latest updates from Bhairavnath Cricket Club Kuraloshi. Read the latest news, check player rankings, view our gallery, and see who's the player of the month. Join us for live cricket updates!"
        />
        <meta property="og:url" content="https://bcckuraloshi.netlify.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://bcckuraloshi.netlify.app" />
      </Helmet>

      {/* Navbar is always visible */}
      <div className="relative z-40">
        <Navbar />
      </div>

      {/* Show loader until all components (except InstaFeed) are loaded */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-white z-30">
          <Loader />
          <p className="md:text-lg text-sm font-semibold text-gray-800 mt-4">
            {randomText}
          </p>
        </div>
      )}

      {/* Show main content once loader finishes */}
      {!isLoading && (
        <div>
          <MainLayout onLoad={() => handleComponentLoaded("mainLayout")} />
          <LatestNews onLoad={() => handleComponentLoaded("latestNews")} />
          <Players onLoad={() => handleComponentLoaded("players")} />
          <Gallery onLoad={() => handleComponentLoaded("gallery")} />
          <PlayerOfMonth
            onLoad={() => handleComponentLoaded("playerOfMonth")}
          />
          <InstaFeed />
          <Footer onLoad={() => handleComponentLoaded("footer")} />
          {/* InstaFeed will load independently and won't affect the loader */}
        </div>
      )}
    </div>
  );
}

export default Home;
