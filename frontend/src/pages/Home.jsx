import React, { useLayoutEffect, useState, useRef } from "react";
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

function Home() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate a delay for loading components

    return () => clearTimeout(timer);
  }, [location]);

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
          <MainLayout />
          <LatestNews />
          <Players />
          <Gallery />
          <PlayerOfMonth />
          <InstaFeed />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
