import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import AdminDashboard from './pages/AdminDashboard';
import Schedule from './pages/Schedule';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import GalleryDetails from './pages/GalleryDetails';
import NewsDetails from './pages/NewsDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PlayersRanking from './pages/PlayersRanking';
import FullPageLoader from './components/FullPageLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minLoadingTime = 6000; // Minimum loader display time for small screens (5 seconds)
    const screenThreshold = 768; // Define small screen threshold (e.g., 768px)
    const start = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - start;
      const remainingTime = minLoadingTime - elapsedTime;

      // Set a timeout to ensure the minimum loading time has passed
      setTimeout(() => setIsLoading(false), Math.max(remainingTime, 0));
    };

    if (window.innerWidth <= screenThreshold) {
      // Small screen, always display loader for 5 seconds
      setTimeout(() => setIsLoading(false), minLoadingTime);
    } else {
      // Listen for the window load event on larger screens
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<GalleryDetails />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/rankings" element={<PlayersRanking />} />

            {/* Protected Route for Admin Dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
