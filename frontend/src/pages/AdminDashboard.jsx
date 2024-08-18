import React, { useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import FixtureAddForm from '../components/FixtureAddForm';
import UpdateFixtureForm from '../components/UpdateFixtureForm';
import UpdateFixtures from '../components/UpdateFixtures';
import PlayersForm from '../components/PlayersForm';
import PlayersList from '../components/PlayerList';
import NewsAddForm from '../components/NewsAddForm';
import AddGalleryForm from '../components/AddGalleryForm';
import AddCarouselForm from '../components/AddCarouselForm';
import UpdateInformationForm from '../components/UpdateInformationForm';
import MessageView from '../components/MessageView'; // Import the MessageView component

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animation for the welcome message
    gsap.fromTo('.welcome-message', 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 2.0, ease: 'power2.out' }
    );
  }, []);

  const handleAddFixture = async (newFixture) => {
    navigate('/admin-dashboard/fixtures');
  };

  const handleUpdateFixture = async (updatedFixture) => {
    navigate('/admin-dashboard/fixtures');
  };

  const handleAddNews = async (newNewsItem) => {
    navigate('/admin-dashboard/latest-news');
  };

  const handleAddCarousel = async (newCarouselItem) => {
    navigate('/admin-dashboard/carousel');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-gradient-to-br from-orange-600 to-orange-500 text-white w-1/4 p-6 space-y-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link 
                to="add-player" 
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                Add Player
              </Link>
            </li>
            <li>
              <Link 
                to="edit-player" 
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                Edit Player
              </Link>
            </li>
            <li>
              <Link 
                to="add-fixture" 
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                Add Fixture
              </Link>
            </li>
            <li>
              <Link 
                to="fixtures" 
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                Manage Fixtures
              </Link>
            </li>
            <li>
              <Link 
                to="add-carousel" 
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                Add Carousel
              </Link>
            </li>
            <li>
              <Link 
                to="add-news" 
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                Add News
              </Link>
            </li>
            <li>
              <Link 
                to="add-gallery" 
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                Add Gallery Image
              </Link>
            </li>
            <li>
              <Link 
                to="update-info" 
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                Update Information
              </Link>
            </li>
            <li>
              <Link 
                to="messages"  
                className="block py-2 px-4 rounded-md text-white hover:bg-orange-500 transition-colors"
              >
                View Messages
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-2/3 py-2 px-4 rounded-md bg-white text-orange-600 font-bold shadow-md hover:bg-orange-600 hover:border-2 hover:border-zinc-300 hover:text-white transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white w-3/4 p-6 overflow-y-auto">
        <Routes>
          <Route path="add-player" element={<PlayersForm />} />
          <Route path="edit-player" element={<PlayersList />} />
          <Route path="add-fixture" element={<FixtureAddForm onAdd={handleAddFixture} />} />
          <Route path="fixtures" element={<UpdateFixtures />} />
          <Route path="fixtures/edit/:id" element={<UpdateFixtureForm onUpdate={handleUpdateFixture} />} />
          <Route path="add-news" element={<NewsAddForm onAdd={handleAddNews} />} />
          <Route path="add-gallery" element={<AddGalleryForm />} />
          <Route path="add-carousel" element={<AddCarouselForm onAdd={handleAddCarousel} />} />
          <Route path="update-info" element={<UpdateInformationForm clubId="your-club-id" />} />
          <Route path="messages" element={<MessageView />} />
          <Route path="/" element={<h2 className="text-5xl text-center mt-48 font-bold text-gray-800 welcome-message">Welcome to the Admin Dashboard</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
