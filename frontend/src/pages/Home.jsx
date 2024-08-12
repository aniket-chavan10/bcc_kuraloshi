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
  const mainRef = useRef(null);

  useEffect(() => {
    // Scroll to the top whenever the component is mounted or location changes
    window.scrollTo(0, 0);

    // Simulate loading delay for demonstration, remove this in production
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the timeout duration based on actual loading time

    return () => clearTimeout(loadTimeout);
  }, [location]);

  useEffect(() => {
    // GSAP animation setup for loaded components
    if (!isLoading && mainRef.current) {
      gsap.fromTo(
        mainRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, [isLoading]);

  const Loader = () => (
    <div className="flex items-center justify-center w-full h-full py-8">
      <div className="spinner-border animate-spin w-8 h-8 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-white z-50">
        <Navbar /> {/* Always render Navbar */}
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="spinner-border animate-spin w-8 h-8 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar /> {/* Always render Navbar */}
      <div ref={mainRef}> {/* Only animate components inside mainRef */}
        <Suspense fallback={<Loader />}>
          <MainLayout />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <LatestNews />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Players />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <PlayerOfMonth />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <InstaFeed />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
