import React, { useState } from "react";
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
import logo from "../assets/images/logo.png"; // Import static logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const navigate = useNavigate();

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

  // Hardcoded social links
  const socialLinks = {
    facebook: "https://www.instagram.com/bcc_kuruloshi/",
    instagram: "https://www.instagram.com/bcc_kuruloshi/",
    youtube: "https://youtube.com/@bcckuruloshi?si=xXprlQwXTdDpoDI8",
    whatsapp: "https://wa.me/8975489506",
  };

  return (
    <>
      {(isLogoLoaded || true) && (
        <nav className="fixed top-0 w-full z-10 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 w-20 md:w-28 h-full flex items-center md:border-r px-3">
              <img
                src={logo} // Use static logo image
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
                    <span className="inline-block mr-4">
                      Bhairavnath Cricket Club Kuraloshi | Local Cricket
                      Tournaments, Matches, and Player Rankings
                    </span>
                  </div>
                </div>
                <div className="social-icons flex space-x-4">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-xl"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-xl"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-xl"
                  >
                    <FaYoutube />
                  </a>
                 
                  <button
                    className="login-btn font-semibold"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </div>
                {/* Horizontal Line */}
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
                <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-xl"
                  >
                    <FaWhatsapp />
                  </a>
                  <FaSearch className="cursor-pointer" />
                </div>

                <div className="md:hidden flex items-center ml-auto">
                  <button
                    onClick={handleMenuClick}
                    className="text-3xl focus:outline-none"
                  >
                    <FaBars />
                  </button>
                </div>
                {/* Vertical Line */}
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
            className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r from-orange-600 to-orange-500 transform transition-transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 flex ">
              <button onClick={handleMenuClick} className="text-3xl">
                <FaTimes />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-montserrat font-semibold border-b border-yellow-100 border-opacity-90 text-lg"
                    : "text-white font-montserrat font-semibold border-b border-yellow-100 border-opacity-40 text-lg"
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
                    ? "text-yellow-300 font-montserrat font-semibold border-b border-yellow-100 border-opacity-90 text-lg"
                    : "text-white font-montserrat font-semibold border-b border-yellow-100 border-opacity-40 text-lg"
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
                    ? "text-yellow-300 font-montserrat font-semibold border-b border-yellow-100 border-opacity-90 text-lg"
                    : "text-white font-montserrat font-semibold border-b border-yellow-100 border-opacity-40 text-lg"
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
                    ? "text-yellow-300 font-montserrat font-semibold border-b border-yellow-100 border-opacity-90 text-lg"
                    : "text-white font-montserrat font-semibold border-b border-yellow-100 border-opacity-40 text-lg"
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
                    ? "text-yellow-300 font-montserrat font-bold border-b border-yellow-100 border-opacity-90 text-lg"
                    : "text-white font-montserrat font-bold border-b border-yellow-100 border-opacity-40 text-lg"
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
                    ? "text-yellow-300 font-montserrat font-semibold border-b border-yellow-100 border-opacity-90 text-lg"
                    : "text-white font-montserrat font-semibold border-b border-yellow-100 border-opacity-40 text-lg"
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
                    ? "text-yellow-300 font-montserrat font-semibold border-b border-yellow-100 border-opacity-90 text-lg"
                    : "text-white font-montserrat font-semibold border-b border-yellow-100 border-opacity-40 text-lg"
                }
                onClick={() => {
                  closeMenu();
                  scrollToTop();
                }}
              >
                Contact
              </NavLink>

              <div className="flex flex-col items-center pt-16">
                <h1 className="text-xl font-bold font-josefin underline underline-offset-8">
                  FOLLOW US ON
                </h1>
                <div className="mt-4 flex flex-row space-x-4 text-white ">
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl rounded-full border p-1 "
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl rounded-full border p-1"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl rounded-full border p-1"
                    >
                      <FaYoutube />
                    </a>
                  )}
                  {socialLinks.whatsapp && (
                    <a
                      href={socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl rounded-full border p-1"
                    >
                      <FaWhatsapp />
                    </a>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
