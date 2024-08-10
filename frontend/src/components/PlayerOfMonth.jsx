import React, { useEffect, useState, useRef } from "react";
import { fetchPlayersData } from "../services/api";
import playerBg from "../assets/images/team_player_bg.jpg";
import Loader from "./Loader"; // Adjust the import path as needed
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
        const players = await fetchPlayersData(); // Fetch data from backend

        if (players.length === 0) {
          setError("No players data found");
          setLoading(false);
          return;
        }

        // Calculate best batsman
        const batsman = players.reduce((best, player) =>
          player.runs > (best.runs || 0) ? player : best
        );

        // Calculate best bowler
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
      // Animation for Best Batsman
      gsap.fromTo(
        batsmanRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotateY: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          scrollTrigger: {
            trigger: batsmanRef.current,
            start: "top 90%", // Start animation when the card is fully visible
            end: "top 70%", // End animation when the top of the card is 70% down the viewport
            scrub: 1,
          },
        }
      );

      // Animation for Best Bowler
      gsap.fromTo(
        bowlerRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotateY: 10,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          scrollTrigger: {
            trigger: bowlerRef.current,
            start: "top 90%", // Same start point as batsman
            end: "top 70%", // Same end point as batsman
            scrub: 1,
          },
        }
      );
    }
  }, [bestBatsman, bestBowler]);

  if (loading) return <Loader />;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10 mt-3 px-4 md:px-0">
      <h2 className="text-xl font-bold">
        Player Of The Month:{" "}
        <span className="text-orange-600">"{currentMonth}"</span>
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center p-2">
        {/* Best Batsman */}
        <div
          ref={batsmanRef}
          className="w-full md:w-1/2 relative overflow-hidden shadow-xl transform-gpu"
          style={{ backgroundImage: `url(${playerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="flex flex-col md:flex-row h-full items-baseline text-white">
            <div
              className="w-full md:w-1/3 relative"
              style={{ aspectRatio: "3 / 4" }}
            >
              <img
                src={bestBatsman?.image}
                alt={bestBatsman?.name || "Default Image"}
                className="object-cover w-full h-full absolute inset-0"
                onError={(e) => {
                  e.target.src = "/default-image.jpg"; // Fallback to default image if there's an error
                }}
              />
            </div>
            <div className="flex flex-col md:mt-auto py-3 px-1 w-full md:w-auto bg-gradient-to-tr from-slate-500 to-slate-800 bg-opacity-30 md:bg-none">
              <h1 className="text-orange-500 text-5xl md:text-7xl font-bold font-montserrat hidden md:block">
                {bestBatsman?.runs}{" "}
                <span className="text-zinc-700 text-xl md:text-lg">Most Runs</span>
              </h1>
              <p className="text-3xl md:text-4xl md:text-zinc-800 text-zinc-50 font-montserrat font-bold capitalize">
                {bestBatsman?.name}
              </p>
              <div className="flex flex-grow justify-center md:justify-start text-center py-2 gap-2 md:gap-4">
                <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                  {bestBatsman?.matches}
                  <span className="text-zinc-100 md:text-xs text-sm font-light">Matches</span>
                </p>
                <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                  {bestBatsman?.runs}{" "}
                  <span className="text-zinc-100 md:text-xs text-sm font-light">Runs</span>
                </p>
                <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                  {bestBatsman?.bestScore}{" "}
                  <span className="text-zinc-100 md:text-xs text-sm font-light">Best Score</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Bowler */}
        <div
          ref={bowlerRef}
          className="w-full md:w-1/2 relative overflow-hidden shadow-xl transform-gpu"
          style={{ backgroundImage: `url(${playerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="flex flex-col md:flex-row h-full items-baseline text-white">
            <div
              className="w-full md:w-1/3 relative"
              style={{ aspectRatio: "3 / 4" }}
            >
              <img
                src={bestBowler?.image}
                alt={bestBowler?.name || "Default Image"}
                className="object-cover w-full h-full absolute inset-0"
                onError={(e) => {
                  e.target.src = "/default-image.jpg"; // Fallback to default image if there's an error
                }}
              />
            </div>
            <div className="flex flex-col md:mt-auto py-3 px-1 w-full md:w-auto bg-gradient-to-tr from-slate-500 to-slate-800 bg-opacity-30 md:bg-none">
              <h1 className="text-orange-500 text-5xl md:text-7xl font-bold font-montserrat hidden md:block">
                {bestBowler?.wickets}{" "}
                <span className="text-zinc-700 text-xl md:text-lg">Most Wickets</span>
              </h1>
              <p className="text-3xl md:text-4xl md:text-zinc-800 text-zinc-50 font-montserrat font-bold capitalize">
                {bestBowler?.name}
              </p>
              <div className="flex flex-grow justify-center md:justify-start text-center py-2 gap-2 md:gap-4">
                <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                  {bestBowler?.matches}
                  <span className="text-zinc-100 md:text-xs text-sm font-light">Matches</span>
                </p>
                <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                  {bestBowler?.wickets}{" "}
                  <span className="text-zinc-100 md:text-xs text-sm font-light">Wickets</span>
                </p>
                <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                  {bestBowler?.bestBowling}{" "}
                  <span className="text-zinc-100 md:text-xs text-sm font-light">Best Bowling</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerOfMonth;
