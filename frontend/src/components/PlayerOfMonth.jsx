import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import playerBg from "../assets/images/team_player_bg.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function PlayerCard({ player, title, stat1, stat2, stat3, imageRef, label }) {
  const statsRef = useRef(null);

  useEffect(() => {
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={imageRef}
      className="w-full md:w-1/2 relative overflow-hidden shadow-xl transform-gpu"
      style={{
        backgroundImage: `url(${playerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 right-2 py-1 px-2 bg-gray-500 text-gray-50 font-montserrat text-sm rounded-b-lg shadow-md z-20">
        {label}
      </div>
      <div className="flex flex-col md:flex-row h-full items-baseline text-white">
        <div
          className="w-full md:w-1/3 relative"
          style={{ aspectRatio: "3 / 4" }}
        >
          <img
            src={player?.image}
            alt={player?.name || "Default Image"}
            className="object-cover w-full h-full absolute inset-0"
            onError={(e) => {
              e.target.src = "/default-image.jpg"; // Fallback to default image if there's an error
            }}
          />
        </div>
        <div className="relative flex flex-col md:mt-auto py-3 px-1 w-full md:w-auto bg-gradient-to-tr md:bg-none animate-detail">
          {window.innerWidth < 768 && (
            <div
              className="absolute inset-0 z-0 bg-gradient-to-r from-amber-500 to-orange-500 bg-opacity-45"
            ></div>
          )}
          <h1 className="text-orange-500 text-5xl md:text-7xl font-bold font-montserrat hidden md:block animate-detail z-10">
            {stat1.value}{" "}
            <span className="text-zinc-700 text-xl md:text-lg">{title}</span>
          </h1>
          <p className="text-4xl md:text-4xl text-white md:text-gray-800 font-montserrat font-bold capitalize animate-detail z-10">
            {player?.name}
          </p>
          <div
            ref={statsRef}
            className="flex flex-grow justify-center md:justify-start text-center py-2 gap-2 md:gap-4 animate-detail z-10"
          >
            <div className="flex flex-col items-center justify-center bg-black bg-opacity-60 px-4 py-2 rounded-lg shadow-lg w-2/5 h-16">
              <p className="text-orange-500 font-black text-xl capitalize">
                {stat1.value}
              </p>
              <p className="text-zinc-50 text-xs font-light">{stat1.label}</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-black bg-opacity-60 px-4 py-2 rounded-lg shadow-lg w-2/5 h-16">
              <p className="text-orange-500 font-black text-xl capitalize">
                {stat2.value}
              </p>
              <p className="text-zinc-50 text-xs font-light">{stat2.label}</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-black bg-opacity-60 px-4 py-2 rounded-lg shadow-lg w-2/5 h-16">
              <p className="text-orange-500 font-black text-xl capitalize">
                {stat3.value}
              </p>
              <p className="text-zinc-50 text-xs font-light">{stat3.label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
