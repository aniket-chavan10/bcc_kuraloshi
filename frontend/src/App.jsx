import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import AdminDashboard from './pages/AdminDashboard';
import Schedule from './pages/Schedule';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import GalleryDetails from './pages/GalleryDetails';
import NewsPage from './pages/NewsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PlayersRanking from './pages/PlayersRanking';
import FullPageLoader from './components/FullPageLoader';
import PageNotFound from './pages/PageNotFound'; // Import the PageNotFound component
import { AppProvider } from './context/AppContext';  // Import the provider

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minLoadingTime = 6000; // Minimum loader display time for small screens (6 seconds)
    const screenThreshold = 768; // Define small screen threshold (e.g., 768px)
    const start = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - start;
      const remainingTime = minLoadingTime - elapsedTime;

      setTimeout(() => setIsLoading(false), Math.max(remainingTime, 0));
    };

    if (window.innerWidth <= screenThreshold) {
      setTimeout(() => setIsLoading(false), minLoadingTime);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <AppProvider>  {/* Wrap your application with the context provider */}
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
            <Route path="/news/:id" element={<NewsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/rankings" element={<PlayersRanking />} />

            {/* Protected Route for Admin Dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
            </Route>

            {/* Wildcard route for unmatched paths */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      )}
    </AppProvider>
  );
}

export default App;
