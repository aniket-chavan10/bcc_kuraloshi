import React, { useState, useEffect, useRef } from "react";
import { fetchPlayersData } from "../services/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Players() {
  const [playersData, setPlayersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const cardsRef = useRef([]);

  const playersPerPage = isSmallScreen ? 1 : 4;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPlayersData();
        setPlayersData(data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 80%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
            // markers: true, // Uncomment to see markers for debugging
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [playersData, isSmallScreen, imagesLoaded]);

  const handleImageLoad = () => {
    if (
      cardsRef.current.length &&
      cardsRef.current.every((card) => card.complete)
    ) {
      setImagesLoaded(true);
    }
  };

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

  return (
    <div className="relative overflow-hidden w-full mx-auto py-10 container px-4">
      <h2 className="text-2xl font-bold mb-4">Players</h2>
      {imagesLoaded && (
        <>
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
                className={`bg-zinc-50 ${
                  isSmallScreen ? "w-full" : "w-1/4"
                } flex-shrink-0 px-2`}
                style={{ flex: isSmallScreen ? "0 0 100%" : "0 0 25%" }}
              >
                <div className="bg-gradient-to-b from-slate-50 to-slate-200 mb-5 flex flex-col items-center justify-center">
                  <div className="relative h-72 w-full md:w-64 overflow-hidden flex justify-center items-center">
                    <img
                      src={player.image ? player.image : "/default-image.jpg"}
                      alt={player.name}
                      className="object-contain max-h-full max-w-full"
                      onError={(e) => {
                        e.target.src = "/default-image.jpg";
                      }}
                      onLoad={handleImageLoad}
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
              className={`bg-gray-950 text-orange-500 p-1 rounded-full ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              className={`bg-gray-950 text-orange-500 text-center p-1 rounded-full ${
                currentPage + playersPerPage >= playersData.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={nextPage}
              disabled={currentPage + playersPerPage >= playersData.length}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Players;
