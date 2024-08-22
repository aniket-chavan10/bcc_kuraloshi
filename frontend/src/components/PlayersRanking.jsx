import React, { useEffect, useState } from "react";
import { fetchPlayersData } from "../services/api";
import gsap from "gsap";
import Loader from "../components/Loader"; // Adjust the import path according to your project structure

const PlayerRanking = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("runs");

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const data = await fetchPlayersData();
        setPlayers(data);
        setLoading(false); // Stop the loader once data is fetched
        gsap.fromTo(
          ".player-card",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }
        );
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoading(false); // Stop the loader in case of an error
      }
    };

    getPlayers();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".player-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }
    );
  }, [activeTab]);

  const sortedPlayers =
    activeTab === "runs"
      ? [...players].sort((a, b) => b.runs - a.runs)
      : [...players].sort((a, b) => b.wickets - a.wickets);

  return (
    <div className="container mx-auto md:py-28 mb-5 md:mt-6 mt-16 px-4 md:px-0 max-w-7xl flex flex-col md:flex-row">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader /> {/* Centered Loader */}
        </div>
      ) : (
        <>
          {/* Side Menu */}
          <div className="w-full md:w-1/4 bg-gray-200 p-4 rounded-lg shadow-md mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Player Rankings</h2>
            <button
              className={`w-full text-left py-2 px-4 mb-2 rounded ${
                activeTab === "runs"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setActiveTab("runs")}
            >
              By Runs
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded ${
                activeTab === "wickets"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setActiveTab("wickets")}
            >
              By Wickets
            </button>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 md:ml-6">
            {sortedPlayers.length > 0 && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {activeTab === "runs" ? "Top Scorers" : "Top Wicket Takers"}
                </h2>
                <div className="player-card bg-gradient-to-br from-amber-500 via-yellow-300 to-yellow-400 text-white rounded-lg p-6 relative">
                  <img
                    src={sortedPlayers[0].image}
                    alt={sortedPlayers[0].name}
                    className="w-24 h-full md:w-32 md:h-full absolute top-0 left-0 object-cover ml-5"
                  />
                  <div className="md:ml-40 ml-24">
                    <div className="md:text-6xl text-3xl font-bold">
                      #{sortedPlayers[0].jerseyNo}
                    </div>
                    <div className="md:text-2xl text-md mt-2">
                      {sortedPlayers[0].name.toUpperCase()}
                    </div>
                  </div>
                  <div className="absolute top-0 right-20 transform translate-x-1/2 shadow-xl bg-white px-4 py-1 flex flex-col items-center">
                    <span className="text-4xl text-orange-500 font-bold">
                      {activeTab === "runs"
                        ? sortedPlayers[0].runs
                        : sortedPlayers[0].wickets}
                    </span>
                    <span className="text-sm font-thin text-gray-600">
                      {activeTab === "runs" ? "RUNS" : "WICKETS"}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg mt-6">
                  {sortedPlayers.slice(1).map((player, index) => (
                    <div
                      key={player._id}
                      className="player-card flex justify-between items-center py-1 px-6 border-b last:border-b-0 shadow-md"
                    >
                      <div className="flex items-center">
                        <div className="text-gray-950 font-bold text-xl">
                          {index + 2}
                        </div>
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-16 h-16 ml-4 object-cover object-top rounded-full"
                        />
                        <div className="ml-4">
                          <div className="font-semibold capitalize">
                            {player.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {player.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-500 font-bold md:text-xl text-lg">
                          {activeTab === "runs" ? player.runs : player.wickets}
                        </div>
                        <div className="text-gray-500 md:text-sm text-xs mt-1">
                          {activeTab === "runs" ? "RUNS" : "WICKETS"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerRanking;
