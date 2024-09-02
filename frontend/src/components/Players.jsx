import React, { useState, useEffect, useRef, useContext } from "react";
import { fetchPlayersData } from "../services/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppContext from "../context/AppContext"; // Import the context

gsap.registerPlugin(ScrollTrigger);

function Players() {
  const { playersData, setPlayersData } = useContext(AppContext); // Use context for players data
  const [currentPage, setCurrentPage] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardsRef = useRef([]);

  const playersPerPage = isSmallScreen ? 1 : 4;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPlayersData();

        // Ensure "Captain" is at the first index
        const sortedData = data.sort((a, b) => {
          if (a.subrole === "Captain") return -1;
          if (b.subrole === "Captain") return 1;
          return 0;
        });

        setPlayersData(sortedData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching player data:", error);
        setIsLoaded(true);
      }
    }

    if (playersData.length === 0) {
      // Only fetch if playersData is empty
      fetchData();
    } else {
      setIsLoaded(true); // If data is already available, mark as loaded
    }
  }, [playersData, setPlayersData]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }
  }, [playersData, isLoaded]);

  const nextPage = () => {
    if (currentPage + playersPerPage < playersData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getSubroleAbbreviation = (subrole) => {
    switch (subrole) {
      case "Captain":
        return "C";
      case "Vice Captain":
        return "Vc";
      case "Wicketkeeper":
        return "Wk";
      default:
        return null;
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p></p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full mx-auto py-10 container px-4">
      <h2 className="text-2xl font-bold mb-4">Players</h2>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentPage * (100 / playersPerPage)}%)`,
        }}
      >
        {playersData.map((player, index) => (
          <div
            ref={(el) => (cardsRef.current[index] = el)}
            key={index}
            className={`relative bg-zinc-50 ${
              isSmallScreen ? "w-full" : "w-1/4"
            } flex-shrink-0 px-2`}
            style={{ flex: isSmallScreen ? "0 0 100%" : "0 0 25%" }}
          >
            {getSubroleAbbreviation(player.subrole) && (
              <div className="absolute top-2 right-8 bg-gray-500 text-zinc-50 text-xs font-bold px-2 py-1 rounded-full">
                {getSubroleAbbreviation(player.subrole)}
              </div>
            )}
            <div className="bg-gradient-to-b from-slate-50 to-slate-200 mb-5 flex flex-col items-center justify-center">
              <div className="relative h-72 w-full md:w-64 overflow-hidden flex justify-center items-center">
                <img
                  src={player.image ? player.image : "/default-image.jpg"}
                  alt={player.name}
                  className="object-cover max-h-full max-w-full"
                  onError={(e) => {
                    e.target.src = "/default-image.jpg";
                  }}
                />
              </div>
              <hr className="w-full border-zinc-500 border-spacing-1" />
              <div className="text-center py-2">
                <h2 className="text-xl text-orange-600 font-black uppercase leading-tight">
                  {player.name}
                </h2>
                <p className="text-zinc-800 uppercase font-extralight">
                  {player.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 items-center px-4 mb-4">
        <button
          className={`bg-gradient-to-tr from-orange-500 to-orange-400 text-white p-1 rounded-full shadow-lg ${
            currentPage === 0 ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          className={`bg-gradient-to-tr from-orange-500 to-orange-400 text-white p-1 rounded-full shadow-lg ${
            currentPage + playersPerPage >= playersData.length
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
          onClick={nextPage}
          disabled={currentPage + playersPerPage >= playersData.length}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Players;
