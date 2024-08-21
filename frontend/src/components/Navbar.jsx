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
import staticLogo from "../assets/images/logo.png"; // Import your static logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubInfo, setClubInfo] = useState(null);
  const [newsTitles, setNewsTitles] = useState([]);
  const [isLogoLoaded, setIsLogoLoaded] = useState(
    sessionStorage.getItem("isLogoLoaded") === "true"
  );
  const [forceShowNavbar, setForceShowNavbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubResponse = await fetchLatestInfo();
        if (clubResponse) {
          setClubInfo(clubResponse);

          if (clubResponse.logo && !isLogoLoaded) {
            const img = new Image();
            img.src = clubResponse.logo;
            img.onload = () => {
              setIsLogoLoaded(true);
              sessionStorage.setItem("isLogoLoaded", "true");
            };
            img.onerror = () => {
              setIsLogoLoaded(true);
              sessionStorage.setItem("isLogoLoaded", "true");
            };
          } else if (!clubResponse.logo) {
            setIsLogoLoaded(true); // No dynamic logo, use static one
            sessionStorage.setItem("isLogoLoaded", "true");
          }
        }

        const newsData = await fetchNewsData();
        if (Array.isArray(newsData)) {
          const titles = newsData.map((news) => ({
            id: news._id,
            title: news.title,
          }));
          setNewsTitles(titles);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (!isLogoLoaded) {
      fetchData();
    }

    const timeoutId = setTimeout(() => {
      setForceShowNavbar(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isLogoLoaded]);

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
            <div className="flex-shrink-0 w-20 md:w-28 h-full flex items-center md:border-r px-3">
              <img
                src={clubInfo?.logo || staticLogo} // Use dynamic logo if available, else static
                alt="Logo"
                className="h-auto w-auto object-cover p-1 md:-mb-6 -mb-4"
                onLoad={() => setIsLogoLoaded(true)}
                onError={() => setIsLogoLoaded(true)}
              />
            </div>

            <div className="flex-grow flex flex-col">
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
                      className="cursor-pointer text-xl"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl"
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
                      className="cursor-pointer text-xl"
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
                    {isOpen ? <FaTimes /> : <FaBars />}
                  </button>
                </div>
                <div className="absolute top-0 bottom-0 left-0 border-l-2 border-white"></div>
              </div>
            </div>
          </div>

          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`fixed top-0 right-0 w-3/4 max-w-xs bg-white text-black h-full transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform`}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                  onClick={handleMenuClick}
                  className="text-2xl"
                >
                  <FaTimes />
                </button>
              </div>
              <ul className="mt-4 space-y-4 p-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-black font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/team"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-black font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Team
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/schedule"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-black font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Schedule
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rankings"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-black font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Rankings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-black font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-black font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-montserrat font-semibold"
                        : "text-black font-montserrat font-semibold"
                    }
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
