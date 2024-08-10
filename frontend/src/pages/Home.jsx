import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
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

  useEffect(() => {
    // Scroll to the top whenever the component is mounted or location changes
    window.scrollTo(0, 0);
  }, [location]);

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
