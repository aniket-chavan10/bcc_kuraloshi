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
    <div className="container mx-auto mt-8 p-4 bg-gray-50 rounded-lg shadow-lg max-w-screen-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Manage Players
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {playersData.map((player) => (
          <div
            key={player._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={player.image || "path/to/placeholder-image.jpg"}
              alt={player.name}
              className="rounded-t-lg w-full h-44 object-cover"
            />
            <div className="flex flex-col items-center justify-center p-4">
              <h3 className="text-lg font-semibold mb-2">{player.name}</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditClick(player, "profile")}
                  className="px-4 py-1 text-orange-600 text-sm border border-orange-600 rounded hover:bg-orange-100"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleEditClick(player, "stats")}
                  className="px-4 py-1 text-orange-600 text-sm border border-orange-600 rounded hover:bg-orange-100"
                >
                  Edit Stats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
