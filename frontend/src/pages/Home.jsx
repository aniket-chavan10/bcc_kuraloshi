import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import LatestNews from "../components/LatestNews";
import Gallery from "../components/Gallery";
import InstaFeed from "../components/InstaFeed";
import Players from "../components/Players";
import PlayerOfMonth from "../components/PlayerOfMonth";
import Footer from "../components/Footer";
import MainLayout from "../components/MainLayout";

function Home() {
  const location = useLocation(); // Get location object from useLocation hook
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Scroll to the top whenever the component is mounted or location changes
    window.scrollTo(0, 0);

    // Simulate loading delay for demonstration, remove this in production
    const loadTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false when components are loaded
    }, 1000); // Adjust the timeout duration based on actual loading time

    return () => clearTimeout(loadTimeout); // Clean up the timeout if the component unmounts
  }, [location]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <MainLayout />
      <LatestNews />
      <Players />
      <Gallery />
      <PlayerOfMonth />
      <InstaFeed />
      <Footer />
    </>
  );
}

export default Home;
