import React, { useState, useEffect } from "react";
import { updatePlayerStats } from "../services/api"; // Import the API function

const PlayerStatsForm = ({ player, onSave, onCancel }) => {
  const [statsData, setStatsData] = useState({
    matches: 0,
    runs: 0,
    wickets: 0,
    monthlyRuns: 0,
    monthlyWickets: 0,
    newRuns: '',
    newWickets: '',
    bestScore: 0,
  });

  useEffect(() => {
    const fetchStats = () => {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

      // Find stats for the current month
      const currentMonthStats = player.monthlyStats?.find(stat => stat.month === currentMonth) || { runs: 0, wickets: 0 };

      setStatsData({
        matches: player.matches || 0,
        runs: player.runs || 0,
        wickets: player.wickets || 0,
        monthlyRuns: currentMonthStats.runs || 0,  // Initialize with current month's runs
        monthlyWickets: currentMonthStats.wickets || 0, // Initialize with current month's wickets
        newRuns: '',
        newWickets: '',
        bestScore: player.bestScore || 0,
      });
    };

    fetchStats();
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value === '' ? '' : parseInt(value, 10) || 0; // Ensure value is parsed as integer or empty string

    setStatsData((prevStatsData) => {
      console.log(`Updating ${name} to ${newValue}`); // Debugging log
      return { ...prevStatsData, [name]: newValue };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate updated monthly runs and wickets
    const updatedMonthlyRuns = statsData.monthlyRuns + (parseInt(statsData.newRuns, 10) || 0) - statsData.monthlyRuns;
    const updatedMonthlyWickets = statsData.monthlyWickets + (parseInt(statsData.newWickets, 10) || 0) - statsData.monthlyWickets;

    // Update best score based on new runs or wickets
    let updatedBestScore = Math.max(statsData.bestScore, parseInt(statsData.newRuns, 10) || 0);

    if ((parseInt(statsData.newWickets, 10) || 0) > 3) {
      updatedBestScore = `${parseInt(statsData.newWickets, 10) || 0} Wickets`;
    }

    const currentDate = new Date();
    const updatedRunsLog = [
      ...(player.runsLog || []),
      { date: currentDate.toISOString(), runs: parseInt(statsData.newRuns, 10) || 0 },
    ];
    const updatedWicketsLog = [
      ...(player.wicketsLog || []),
      { date: currentDate.toISOString(), wickets: parseInt(statsData.newWickets, 10) || 0 },
    ];

    const updatedStats = {
      matches: statsData.matches + 1,
      runs: statsData.runs + (parseInt(statsData.newRuns, 10) || 0),
      wickets: statsData.wickets + (parseInt(statsData.newWickets, 10) || 0),
      runsLog: updatedRunsLog,
      wicketsLog: updatedWicketsLog,
      monthlyStats: [
        ...player.monthlyStats.filter(stat => stat.month !== currentDate.toISOString().slice(0, 7)),
        { month: currentDate.toISOString().slice(0, 7), runs: updatedMonthlyRuns, wickets: updatedMonthlyWickets },
      ],
      bestScore: updatedBestScore,
    };

    try {
      await updatePlayerStats(player._id, updatedStats); // Call the API to update player stats
      onSave({ ...player, ...updatedStats }); // Pass updated data back to parent component
    } catch (error) {
      console.error("Failed to update player stats:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-auto flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Edit Player Stats</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Non-editable fields */}
            <div className="bg-gray-100 p-4 rounded border border-gray-300">
              <label htmlFor="matches" className="block text-gray-700">Matches Played:</label>
              <input
                type="number"
                id="matches"
                name="matches"
                value={statsData.matches}
                readOnly
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded border border-gray-300">
              <label htmlFor="runs" className="block text-gray-700">Total Runs:</label>
              <input
                type="number"
                id="runs"
                name="runs"
                value={statsData.runs}
                readOnly
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded border border-gray-300">
              <label htmlFor="wickets" className="block text-gray-700">Total Wickets:</label>
              <input
                type="number"
                id="wickets"
                name="wickets"
                value={statsData.wickets}
                readOnly
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded border border-gray-300">
              <label htmlFor="monthlyRuns" className="block text-gray-700">Runs This Month:</label>
              <input
                type="number"
                id="monthlyRuns"
                name="monthlyRuns"
                value={statsData.monthlyRuns}
                readOnly
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded border border-gray-300">
              <label htmlFor="monthlyWickets" className="block text-gray-700">Wickets This Month:</label>
              <input
                type="number"
                id="monthlyWickets"
                name="monthlyWickets"
                value={statsData.monthlyWickets}
                readOnly
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded border border-gray-300">
              <label htmlFor="bestScore" className="block text-gray-700">Best Score:</label>
              <input
                type="text"
                id="bestScore"
                name="bestScore"
                value={statsData.bestScore}
                readOnly
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded outline-none"
              />
            </div>
            {/* Editable fields */}
            <div className="p-4 rounded border border-orange-300 bg-blue-50">
              <label htmlFor="newRuns" className="block text-gray-700">New Runs:</label>
              <input
                type="number"
                id="newRuns"
                name="newRuns"
                value={statsData.newRuns}
                onChange={handleChange}
                placeholder="Enter new runs"
                className="w-full p-2 border border-blue-300 rounded outline-none"
              />
            </div>
            <div className="p-4 rounded border border-orange-300 bg-green-50">
              <label htmlFor="newWickets" className="block text-gray-700">New Wickets:</label>
              <input
                type="number"
                id="newWickets"
                name="newWickets"
                value={statsData.newWickets}
                onChange={handleChange}
                placeholder="Enter new wickets"
                className="w-full p-2 border border-green-300 rounded outline-none"
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
