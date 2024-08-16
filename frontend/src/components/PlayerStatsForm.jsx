import React, { useState, useEffect } from "react";
import { updatePlayerStats } from "../services/api"; // Import the API function

const PlayerStatsForm = ({ player, onSave, onCancel }) => {
  const [statsData, setStatsData] = useState({
    matches: 0,
    runs: 0,
    wickets: 0,
    monthlyRuns: 0,
    monthlyWickets: 0,
    newRuns: 0,
    newWickets: 0,
    bestScore: 0,
  });

  useEffect(() => {
    // Calculate monthly stats and initialize state
    const currentMonth = new Date().getMonth();
    const storedMonth = localStorage.getItem("currentMonth");
    let monthlyRuns = 0;
    let monthlyWickets = 0;

    if (storedMonth == null || parseInt(storedMonth) !== currentMonth) {
      localStorage.setItem("currentMonth", currentMonth);
    } else {
      monthlyRuns = player.runsLog
        ? player.runsLog.reduce((total, log) => {
            const logDate = new Date(log.date);
            const logMonth = logDate.getMonth();
            if (logMonth === currentMonth) {
              return total + log.runs;
            }
            return total;
          }, 0)
        : 0;

      monthlyWickets = player.wicketsLog
        ? player.wicketsLog.reduce((total, log) => {
            const logDate = new Date(log.date);
            const logMonth = logDate.getMonth();
            if (logMonth === currentMonth) {
              return total + log.wickets;
            }
            return total;
          }, 0)
        : 0;
    }

    const bestScore = player.runsLog
      ? Math.max(...player.runsLog.map((log) => log.runs), 0)
      : 0;

    setStatsData({
      matches: player.matches || 0,
      runs: player.runs || 0,
      wickets: player.wickets || 0,
      monthlyRuns,
      monthlyWickets,
      newRuns: 0,
      newWickets: 0,
      bestScore,
    });
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatsData({
      ...statsData,
      [name]: parseInt(value) || 0, // Ensure value is a number
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated stats object
    const currentDate = new Date();
    const updatedRunsLog = [
      ...(player.runsLog || []),
      { date: currentDate.toISOString(), runs: statsData.newRuns },
    ];
    const updatedWicketsLog = [
      ...(player.wicketsLog || []),
      { date: currentDate.toISOString(), wickets: statsData.newWickets },
    ];

    const updatedStats = {
      matches: statsData.matches + 1,
      runs: statsData.runs + statsData.newRuns,
      wickets: statsData.wickets + statsData.newWickets,
      runsLog: updatedRunsLog,
      wicketsLog: updatedWicketsLog,
    };

    // Update best score
    updatedStats.bestScore = Math.max(updatedStats.bestScore, statsData.newRuns);

    try {
      await updatePlayerStats(player._id, updatedStats); // Call the API to update player stats
      onSave({ ...player, ...updatedStats }); // Pass updated data back to parent component
    } catch (error) {
      console.error("Failed to update player stats:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-auto flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Edit Player Stats</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="matches" className="block text-gray-700">Matches Played:</label>
              <input
                type="number"
                id="matches"
                name="matches"
                value={statsData.matches}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="runs" className="block text-gray-700">Total Runs:</label>
              <input
                type="number"
                id="runs"
                name="runs"
                value={statsData.runs}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="wickets" className="block text-gray-700">Total Wickets:</label>
              <input
                type="number"
                id="wickets"
                name="wickets"
                value={statsData.wickets}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="monthlyRuns" className="block text-gray-700">Runs This Month:</label>
              <input
                type="number"
                id="monthlyRuns"
                name="monthlyRuns"
                value={statsData.monthlyRuns}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="monthlyWickets" className="block text-gray-700">Wickets This Month:</label>
              <input
                type="number"
                id="monthlyWickets"
                name="monthlyWickets"
                value={statsData.monthlyWickets}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="newRuns" className="block text-gray-700">New Runs:</label>
              <input
                type="number"
                id="newRuns"
                name="newRuns"
                value={statsData.newRuns}
                onChange={handleChange}
                placeholder="Enter new runs"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="newWickets" className="block text-gray-700">New Wickets:</label>
              <input
                type="number"
                id="newWickets"
                name="newWickets"
                value={statsData.newWickets}
                onChange={handleChange}
                placeholder="Enter new wickets"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="bestScore" className="block text-gray-700">Best Score:</label>
              <input
                type="number"
                id="bestScore"
                name="bestScore"
                value={statsData.bestScore}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerStatsForm;
