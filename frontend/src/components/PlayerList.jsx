import React, { useState, useEffect } from "react";
import PlayerProfileForm from "../components/PlayerProfileForm";
import PlayerStatsForm from "../components/PlayerStatsForm";
import { fetchPlayersData, updatePlayerProfile, updatePlayerStats } from "../services/api";

const PlayersList = () => {
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [editType, setEditType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlayersData();
        console.log('Fetched players data:', data); // Debugging line
        setPlayersData(data);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleEditClick = (player, type) => {
    setSelectedPlayer(player);
    setEditType(type);
  };

  const handleSave = async (updatedPlayer) => {
    try {
      if (editType === "profile") {
        await updatePlayerProfile(selectedPlayer._id, updatedPlayer);
      } else if (editType === "stats") {
        await updatePlayerStats(selectedPlayer._id, updatedPlayer);
      }

      setPlayersData((prevData) =>
        prevData.map((player) =>
          player._id === selectedPlayer._id
            ? { ...player, ...updatedPlayer }
            : player
        )
      );
      setSelectedPlayer(null);
      setEditType("");
    } catch (error) {
      console.error("Failed to update player:", error);
    }
  };

  const handleCancel = () => {
    setSelectedPlayer(null);
    setEditType("");
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg max-w-screen-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Manage Players
      </h2>
      {playersData.length === 0 ? (
        <p className="text-center text-gray-600">No players available. Please add some players.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {playersData.map((player) => (
            <div
              key={player._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4"
            >
              <img
                src={player.image || "path/to/placeholder-image.jpg"}
                alt={player.name}
                className="rounded-full w-24 h-24 object-contain border-4 border-gray-200 mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{player.name}</h3>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleEditClick(player, "profile")}
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleEditClick(player, "stats")}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                >
                  Edit Stats
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedPlayer && editType === "profile" && (
        <PlayerProfileForm
          player={selectedPlayer}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      {selectedPlayer && editType === "stats" && (
        <PlayerStatsForm
          player={selectedPlayer}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default PlayersList;
