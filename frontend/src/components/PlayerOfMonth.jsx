import React, { useEffect, useState, useRef } from "react";
import { fetchPlayersData } from "../services/api";
import playerBg from "../assets/images/team_player_bg.jpg";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function PlayerCard({ player, title, stats, imageRef, label }) {
  return (
    <div
      ref={imageRef}
      className="w-full md:w-1/2 relative overflow-hidden shadow-md shadow-gray-400 transform-gpu rounded-b-xl"
      style={{
        backgroundImage: `url(${playerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 right-2 py-1 px-2 bg-gray-500 text-gray-50 font-montserrat text-sm shadow-md rounded-b-lg z-20">
        {label}
      </div>
      <div className="flex flex-col md:flex-row h-full items-baseline text-white">
        <div className="w-full md:w-1/3 relative" style={{ aspectRatio: "3 / 4" }}>
          <img
            src={player?.image}
            alt={player?.name || "Default Image"}
            className="object-cover w-full h-full absolute inset-0"
            onError={(e) => {
              e.target.src = "/default-image.jpg"; // Fallback to default image if there's an error
            }}
          />
        </div>
        <div className="relative flex flex-col md:mt-auto py-3 px-1 w-full md:w-auto bg-gradient-to-tr md:bg-none">
          {window.innerWidth < 768 && (
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-amber-500 to-orange-500 bg-opacity-45"></div>
          )}
          <h1 className="text-orange-500 text-5xl md:text-7xl font-bold font-montserrat hidden md:block z-10">
            {stats[0].value}{" "}
            <span className="text-zinc-700 text-xl md:text-lg">{title}</span>
          </h1>
          <p className="text-4xl md:text-4xl text-white md:text-gray-800 font-montserrat font-bold capitalize z-10">
            {player?.name}
          </p>
          <div className="flex flex-grow justify-center md:justify-start text-center py-2 gap-2 md:gap-4">
            {stats.map((stat) => (
              <p
                key={stat.label}
                className="player-card-stats bg-white md:bg-black bg-opacity-20 md:bg-opacity-60 flex flex-col py-1 rounded text-orange-600 font-black text-md md:text-lg capitalize w-1/3 shadow-lg"
                style={{ minWidth: '100px' }} // Adjusting width for smaller size
              >
                {stat.value}{" "}
                <span className="text-zinc-50 md:text-xs text-sm font-light">
                  {stat.label}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerOfMonth() {
  const [bestBatsman, setBestBatsman] = useState(null);
  const [bestBowler, setBestBowler] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const batsmanRef = useRef(null);
  const bowlerRef = useRef(null);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  useEffect(() => {
    async function getData() {
      try {
        const players = await fetchPlayersData();

        if (players.length === 0) {
          setError("No players data found");
          setLoading(false);
          return;
        }

        const batsman = players.reduce((best, player) =>
          player.runs > (best.runs || 0) ? player : best
        );

        const bowler = players.reduce((best, player) =>
          player.wickets > (best.wickets || 0) ? player : best
        );

        setBestBatsman(batsman);
        setBestBowler(bowler);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch player data:", error);
        setError("Failed to fetch player data");
        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (bestBatsman && bestBowler) {
      // Animation for both players
      gsap.fromTo(
        [batsmanRef.current, bowlerRef.current],
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: [batsmanRef.current, bowlerRef.current],
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animation for Stats of both players
      gsap.fromTo(
        ".player-card-stats",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: batsmanRef.current,
            start: "top 70%",
            end: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [bestBatsman, bestBowler]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto py-10 mt-3 px-4 md:px-0">
      <h2 className="text-xl font-bold">
        Player Of The Month:{" "}
        <span className="text-orange-600">"{currentMonth}"</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center p-2">
        {/* Best Batsman */}
        <PlayerCard
          player={bestBatsman}
          title="Most Runs"
          stats={[
            { value: bestBatsman?.runs, label: "Runs" },
            { value: bestBatsman?.matches, label: "Matches" },
            { value: bestBatsman?.bestScore, label: "Best Score" },
          ]}
          imageRef={batsmanRef}
          label="Best Batsman"
        />

        {/* Best Bowler */}
        <PlayerCard
          player={bestBowler}
          title="Most Wickets"
          stats={[
            { value: bestBowler?.wickets, label: "Wickets" },
            { value: bestBowler?.matches, label: "Matches" },
            { value: bestBowler?.bestScore, label: "Best Figure" },
          ]}
          imageRef={bowlerRef}
          label="Best Bowler"
        />
      </div>
    </div>
  );
}

export default PlayerOfMonth;
