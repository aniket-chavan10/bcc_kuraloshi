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

// Import the CricketLoader
import CricketLoader from "../components/CricketLoader";

function Home() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState(0);
  const totalComponents = 7; // Update with the number of lazy-loaded components
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

    // Increment the componentsLoaded state each time a component is loaded
    Promise.all(
      componentPromises.map((promise) =>
        promise.then(() => {
          setComponentsLoaded((prev) => prev + 1);
        })
      )
    ).then(() => {
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

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar /> {/* Always show the Navbar */}
        <div className="flex-grow flex items-center justify-center">
          <CricketLoader /> {/* Use the CricketLoader */}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar /> {/* Render Navbar */}
      <Suspense fallback={<div />}>
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
