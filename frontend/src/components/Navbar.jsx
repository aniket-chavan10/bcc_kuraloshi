import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaFacebookF, FaInstagram, FaYoutube, FaSearch, FaShoppingCart, FaWhatsapp, FaTimes } from "react-icons/fa";
import { fetchLatestInfo, fetchNewsData } from "../services/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubInfo, setClubInfo] = useState(null);
  const [newsTitles, setNewsTitles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubResponse = await fetchLatestInfo();
        console.log("Fetched Club Response:", clubResponse);
        if (clubResponse) {
          setClubInfo(clubResponse);
        } else {
          console.error("No data found in the fetched response");
        }
    
        const newsData = await fetchNewsData();
        console.log("Fetched News Data:", newsData);
        if (Array.isArray(newsData)) {
          const titles = newsData.map(news => ({
            id: news._id,
            title: news.title
          }));
          setNewsTitles(titles);
        } else {
          console.error("Unexpected data format:", newsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Extract social links from clubInfo
  const socialLinks = clubInfo?.socialLinks || {};

  // Log the logo URL to debug
  const logoUrl = clubInfo?.logo ? `http://localhost:4000${clubInfo.logo}` : "";
  console.log("Logo URL:", logoUrl);

  return (
    <nav className="fixed top-0 w-full z-10 bg-gradient-to-r from-orange-700 to-orange-600 text-white">
      <div className="flex items-center">
        {/* Logo */}
        <div className="flex-shrink-0 w-20 md:w-28 h-full flex items-center md:border-r px-3">
          {clubInfo?.logo ? (
            <img
              src={clubInfo.logo}
              alt="Logo"
              className="h-auto w-auto object-cover p-1 md:-mb-6 -mb-4"
              onError={(e) => e.target.src = 'path/to/fallback-image.png'} // Fallback image
            />
          ) : (
            <div className="h-full w-20 bg-gray-900"></div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col">
          {/* Top Bar */}
          <div className="hidden md:flex md:bg-gradient-to-r from-orange-700 to-orange-600 text-white py-2 text-sm justify-between items-center relative px-5">
            <div className="ticker-container overflow-hidden whitespace-nowrap relative w-1/3 h-6 border-l border-zinc-300 border-opacity-60">
              <div className="ticker-text absolute whitespace-nowrap will-change-transform animate-marquee text-white z-50">
                {newsTitles.length > 0 ? (
                  <NavLink
                    key={newsTitles[0].id}
                    to={`/news/${newsTitles[0].id}`}
                    className="inline-block mr-4"
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    {newsTitles[0].title}
                  </NavLink>
                ) : (
                  "Loading latest news..."
                )}
              </div>
            </div>
            <div className="social-icons flex space-x-4">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-xl">
                  <FaFacebookF />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-xl">
                  <FaInstagram />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-xl">
                  <FaYoutube />
                </a>
              )}
              {/* Add any additional social icons here */}
              <button className="login-btn font-semibold" onClick={handleLoginClick}>Login</button>
            </div>
            {/* Horizontal Line */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-white"></div>
          </div>

          {/* Main Navbar */}
          <div className="md:bg-gradient-to-r from-orange-700 to-orange-600 flex justify-between items-center py-2 px-5">
            <div className="hidden md:flex items-center space-x-6 text-zinc-200">
              <NavLink to="/" className="font-montserrat font-semibold" onClick={() => {
                closeMenu();
                scrollToTop();
              }}>Home</NavLink>
              <NavLink to="/team" className="font-montserrat font-semibold" onClick={() => {
                closeMenu();
                scrollToTop();
              }}>Team</NavLink>
              <NavLink to="/schedule" className="font-montserrat font-semibold" onClick={() => {
                closeMenu();
                scrollToTop();
              }}>Schedule</NavLink>
              <NavLink to="/gallery" className="font-montserrat font-bold" onClick={() => {
                closeMenu();
                scrollToTop();
              }}>Gallery</NavLink>
              <NavLink to="/about" className="font-montserrat font-semibold" onClick={() => {
                closeMenu();
                scrollToTop();
              }}>About</NavLink>
              <NavLink to="/contact-us" className="font-montserrat font-semibold" onClick={() => {
                closeMenu();
                scrollToTop();
              }}>Contact</NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <FaSearch className="cursor-pointer" />
              {socialLinks.whatsapp && (
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-xl">
                  <FaWhatsapp />
                </a>
              )}
            </div>

            <div className="md:hidden flex items-center ml-auto">
              <button onClick={handleMenuClick} className="text-3xl focus:outline-none">
                <FaBars />
              </button>
            </div>
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-0 border-l-2 border-white"></div>
          </div>
        </div>
      </div>

      {/* Side Drawer Menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}></div>
      <div className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-r from-orange-700 to-orange-600 text-white shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="text-2xl p-4 focus:outline-none" onClick={closeMenu}>
          <FaTimes />
        </button>
        <nav className="flex flex-col mt-6 justify-center items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? "font-montserrat font-semibold p-4 text-orange-300" : "font-montserrat font-semibold p-4 text-white"} onClick={() => {
            closeMenu();
            scrollToTop();
          }}>Home</NavLink>
          <NavLink to="/team" className={({ isActive }) => isActive ? "font-montserrat font-semibold p-4 text-orange-300" : "font-montserrat font-semibold p-4 text-white"} onClick={() => {
            closeMenu();
            scrollToTop();
          }}>Team</NavLink>
          <NavLink to="/schedule" className={({ isActive }) => isActive ? "font-montserrat font-semibold p-4 text-orange-300" : "font-montserrat font-semibold p-4 text-white"} onClick={() => {
            closeMenu();
            scrollToTop();
          }}>Schedule</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? "font-montserrat font-bold p-4 text-orange-300" : "font-montserrat font-bold p-4 text-white"} onClick={() => {
            closeMenu();
            scrollToTop();
          }}>Gallery</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "font-montserrat font-semibold p-4 text-orange-300" : "font-montserrat font-semibold p-4 text-white"} onClick={() => {
            closeMenu();
            scrollToTop();
          }}>About</NavLink>
          <NavLink to="/contact-us" className={({ isActive }) => isActive ? "font-montserrat font-semibold p-4 text-orange-300" : "font-montserrat font-semibold p-4 text-white"} onClick={() => {
            closeMenu();
            scrollToTop();
          }}>Contact</NavLink>
        </nav>
        <div className="flex justify-center space-x-4 mt-auto mb-6">
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-xl">
              <FaFacebookF />
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-xl">
              <FaInstagram />
            </a>
          )}
          {socialLinks.youtube && (
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-xl">
              <FaYoutube />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
