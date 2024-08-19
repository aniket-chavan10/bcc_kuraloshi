import React, { Suspense, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

// Lazy load components
const LatestNews = React.lazy(() => import("../components/LatestNews"));
const Gallery = React.lazy(() => import("../components/Gallery"));
const InstaFeed = React.lazy(() => import("../components/InstaFeed"));
const Players = React.lazy(() => import("../components/Players"));
const PlayerOfMonth = React.lazy(() => import("../components/PlayerOfMonth"));
const Footer = React.lazy(() => import("../components/Footer"));
const MainLayout = React.lazy(() => import("../components/MainLayout"));

// Import Navbar directly (not lazy-loaded)
import Navbar from "../components/Navbar";

function Home() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Create a list of promises for all lazy-loaded components
    const componentPromises = [
      import("../components/LatestNews"),
      import("../components/Gallery"),
      import("../components/InstaFeed"),
      import("../components/Players"),
      import("../components/PlayerOfMonth"),
      import("../components/Footer"),
      import("../components/MainLayout"),
    ];

    // Wait for all components to load before setting isLoading to false
    Promise.all(componentPromises).then(() => {
      setIsLoading(false);
    });

    // Set a timeout to ensure loading state does not persist indefinitely
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 30000); // 30 seconds

    return () => clearTimeout(timeout);

  }, [location]);

  useEffect(() => {
    if (!isLoading && mainRef.current) {
      gsap.fromTo(
        mainRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setShowNavbar(true);
    }
  }, [isLoading]);

  const Loader = () => (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white">
      <div className="spinner-border animate-spin w-12 h-12 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
      <p className="mt-4 text-gray-700">Loading, please wait...</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        {showNavbar && <Navbar />} {/* Render Navbar after loading completes */}
        <div className="flex-grow flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar /> {/* Render Navbar */}
      <Suspense fallback={<Loader />}>
        <div ref={mainRef}> {/* Only animate components inside mainRef */}
          <MainLayout />
          <LatestNews />
          <Players />
          <Gallery />
          <PlayerOfMonth />
          <InstaFeed />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default Home;
