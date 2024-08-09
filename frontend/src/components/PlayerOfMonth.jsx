import React, { useEffect, useState } from "react";
import { fetchPlayersData } from "../services/api";
import playerBg from "../assets/images/team_player_bg.jpg";
import Loader from "./Loader"; // Adjust the import path as needed

function PlayerOfMonth() {
  const [bestBatsman, setBestBatsman] = useState(null);
  const [bestBowler, setBestBowler] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <Loader />;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-2 md:px-0">
      <h2 className="text-2xl font-bold ">
        Player Of The Month:{" "}
        <span className="text-orange-600 ">"{currentMonth}"</span>
      </h2>
      
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center p-2 ">
          {/* Best Batsman */}
          <div className="w-full md:w-1/2 relative overflow-hidden shadow-xl" style={{ backgroundImage: `url(${playerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex flex-col md:flex-row h-full items-baseline text-white">
              <div className="w-full md:w-1/3 relative" style={{ aspectRatio: "3 / 4" }}>
                <img
                  src={bestBatsman?.image}
                  alt={bestBatsman?.name || "Default Image"}
                  className="object-contain w-full h-full absolute inset-0"
                  onError={(e) => {
                    e.target.src = "/default-image.jpg"; // Fallback to default image if there's an error
                  }}
                />
              </div>
              <div className="flex flex-col md:mt-auto py-3 px-1 w-full md:w-auto bg-gradient-to-tr from-slate-500 to-slate-800 bg-opacity-30 md:bg-none">
                <h1 className="text-orange-500 text-5xl md:text-7xl font-bold font-montserrat hidden md:block">
                  {bestBatsman?.runs}{" "}
                  <span className="text-zinc-700 text-xl md:text-lg">Most Runs</span>{" "}
                </h1>
                <p className="text-3xl md:text-4xl md:text-zinc-800 text-zinc-50 font-montserrat font-bold capitalize">
                  {bestBatsman?.name}
                </p>
                <div className="flex flex-grow justify-center md:justify-start text-center py-2 gap-2 md:gap-4">
                  <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                    {bestBatsman?.matches}
                    <span className="text-zinc-100 md:text-xs text-sm font-light">
                      Matches
                    </span>
                  </p>
                  <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                    {bestBatsman?.runs}{" "}
                    <span className="text-zinc-100 md:text-xs text-sm font-light">
                      Runs
                    </span>
                  </p>
                  <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                    {bestBatsman?.bestScore}{" "}
                    <span className="text-zinc-100 md:text-xs text-sm font-light">
                      Best Score
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Best Bowler */}
          <div className="w-full md:w-1/2 relative overflow-hidden shadow-xl" style={{ backgroundImage: `url(${playerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex flex-col md:flex-row h-full items-baseline text-white">
              <div className="w-full md:w-1/3 relative" style={{ aspectRatio: "3 / 4" }}>
                <img
                  src={bestBowler?.image}
                  alt={bestBowler?.name || "Default Image"}
                  className="object-contain w-full h-full absolute inset-0"
                  onError={(e) => {
                    e.target.src = "/default-image.jpg"; // Fallback to default image if there's an error
                  }}
                />
              </div>
              <div className="flex flex-col md:mt-auto py-3 px-1 w-full md:w-auto bg-gradient-to-tr from-slate-500 to-slate-800 bg-opacity-30 md:bg-none">
                <h1 className="text-orange-500 text-5xl md:text-7xl font-bold font-montserrat hidden md:block">
                  {bestBowler?.wickets}{" "}
                  <span className="text-zinc-700 text-xl md:text-lg">Most Wickets</span>{" "}
                </h1>
                <p className="text-3xl md:text-4xl md:text-zinc-800 text-zinc-50 font-montserrat font-bold capitalize">
                  {bestBowler?.name}
                </p>
                <div className="flex flex-grow justify-center md:justify-start text-center py-2 gap-2 md:gap-4">
                  <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                    {bestBowler?.matches}
                    <span className="text-zinc-100 md:text-xs text-sm font-light">
                      Matches
                    </span>
                  </p>
                  <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                    {bestBowler?.wickets}{" "}
                    <span className="text-zinc-100 md:text-xs text-sm font-light">
                      Wickets
                    </span>
                  </p>
                  <p className="bg-gradient-to-r from-orange-600 to-orange-500 flex flex-col px-3 py-1 rounded text-orange-50 font-black text-base md:text-2xl capitalize w-1/3">
                    {bestBowler?.bestScore}{" "}
                    <span className="text-zinc-100 md:text-xs text-sm font-light">
                      Best Score
                    </span>
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
