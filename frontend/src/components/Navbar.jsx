import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaSearch,
  FaWhatsapp,
  FaTimes,
} from "react-icons/fa";
import { fetchLatestInfo, fetchNewsData } from "../services/api";
import logo from "../assets/images/logo.png"; // Import static logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubInfo, setClubInfo] = useState(null);
  const [newsTitles, setNewsTitles] = useState([]);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [forceShowNavbar, setForceShowNavbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubResponse = await fetchLatestInfo();
        if (clubResponse) {
          setClubInfo(clubResponse);
        } else {
          console.error("No data found in the fetched response");
        }

        const newsData = await fetchNewsData();
        if (Array.isArray(newsData)) {
          const titles = newsData.map((news) => ({
            id: news._id,
            title: news.title,
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

    const timeoutId = setTimeout(() => {
      setForceShowNavbar(true);
    }, 0);

    return () => clearTimeout(timeoutId);
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

  const socialLinks = clubInfo?.socialLinks || {};

  return (
    <>
      {(isLogoLoaded || forceShowNavbar) && (
        <nav className="fixed top-0 w-full z-10 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 w-20 md:w-28 h-full flex items-center md:border-r px-3">
              <img
                src={logo}
                alt="Logo"
                className="h-auto w-auto object-cover p-1 md:-mb-6 -mb-4"
                onLoad={() => setIsLogoLoaded(true)}
                onError={() => setIsLogoLoaded(true)}
              />
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col">
              {/* Top Bar */}
              <div className="hidden md:flex md:bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2 text-sm justify-between items-center relative px-5">
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
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl border-2 border-white rounded-full p-1"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl border-2 border-white rounded-full p-1"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl border-2 border-white rounded-full p-1"
                    >
                      <FaYoutube />
                    </a>
                  )}
                  <button
                    className="login-btn font-semibold"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-t border-white"></div>
              </div>

              {/* Main Navbar */}
              <div className="md:bg-gradient-to-r from-orange-600 to-orange-500 flex justify-between items-center py-2 px-5">
                <div className="hidden md:flex items-center space-x-6 text-zinc-200">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-white font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/team"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-white font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Team
                  </NavLink>
                  <NavLink
                    to="/schedule"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-white font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Schedule
                  </NavLink>
                  <NavLink
                    to="/rankings"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-white font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Rankings
                  </NavLink>
                  <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-bold"
                        : "text-white font-montserrat font-bold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Gallery
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-white font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-white font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Contact
                  </NavLink>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                  <FaSearch className="cursor-pointer" />
                  {socialLinks.whatsapp && (
                    <a
                      href={socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl border-2 border-white rounded-full p-1"
                    >
                      <FaWhatsapp />
                    </a>
                  )}
                </div>

                <div className="md:hidden flex items-center ml-auto">
                  <button
                    onClick={handleMenuClick}
                    className="text-3xl focus:outline-none"
                  >
                    <FaBars />
                  </button>
                </div>
                <div className="absolute top-0 bottom-0 left-0 border-l-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Side Drawer Menu */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeMenu}
          />
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r from-orange-600 to-orange-500 text-white transform transition-transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex p-4">
              <button onClick={closeMenu}>
                <FaTimes className="text-3xl" />
              </button>
            </div>
            <div className="flex flex-col p-2 space-y-4 mt-8">
              <NavLink
                to="/"
                className="text-white text-lg"
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/team"
                className="text-white text-lg"
                onClick={closeMenu}
              >
                Team
              </NavLink>
              <NavLink
                to="/schedule"
                className="text-white text-lg"
                onClick={closeMenu}
              >
                Schedule
              </NavLink>
              <NavLink
                to="/rankings"
                className="text-white text-lg"
                onClick={closeMenu}
              >
                Rankings
              </NavLink>
              <NavLink
                to="/gallery"
                className="text-white text-lg"
                onClick={closeMenu}
              >
                Gallery
              </NavLink>
              <NavLink
                to="/about"
                className="text-white text-lg"
                onClick={closeMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/contact-us"
                className="text-white text-lg"
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-8">
              <h2 className="text-lg font-semibold mb-4">FOLLOW US ON</h2>
              <div className="flex space-x-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-xl border-2 border-white rounded-full p-2"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-xl border-2 border-white rounded-full p-2"
                  >
                    <FaInstagram />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-xl border-2 border-white rounded-full p-2"
                  >
                    <FaYoutube />
                  </a>
                )}
                {socialLinks.whatsapp && (
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-xl border-2 border-white rounded-full p-2"
                  >
                    <FaWhatsapp />
                  </a>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
