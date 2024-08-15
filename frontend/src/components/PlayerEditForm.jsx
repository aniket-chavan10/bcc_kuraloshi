import React, { useState, useEffect } from "react";

const PlayerEditForm = ({ player, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    jerseyNo: "",
    matches: 0,
    runs: 0,
    wickets: 0,
    age: "",
    image: null,
    role: "",
    subrole: "",
    bestScore: "",
    instaUrl: "",
    monthlyRuns: 0,
    monthlyWickets: 0,
    newRuns: 0,
    newWickets: 0,
  });

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const storedMonth = localStorage.getItem("currentMonth");
    let monthlyRuns = 0;
    let monthlyWickets = 0;

    if (storedMonth == null || parseInt(storedMonth) !== currentMonth) {
      localStorage.setItem("currentMonth", currentMonth);
      monthlyRuns = 0;
      monthlyWickets = 0;
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      name: player.name || "",
      jerseyNo: player.jerseyNo || "",
      matches: player.matches || 0,
      runs: player.runs || 0,
      wickets: player.wickets || 0,
      age: player.age || "",
      image: player.image || null,
      role: player.role || "",
      subrole: player.subrole || "",
      bestScore: player.bestScore || "",
      instaUrl: player.instaUrl || "",
      monthlyRuns,
      monthlyWickets,
      newRuns: 0,
      newWickets: 0,
    }));
  }, [player]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRuns = parseInt(formData.runs) + parseInt(formData.newRuns, 10);
    const updatedWickets = parseInt(formData.wickets) + parseInt(formData.newWickets, 10);
    const updatedMatches = parseInt(formData.matches) + 1;
    const updatedMonthlyRuns = parseInt(formData.monthlyRuns, 10) + parseInt(formData.newRuns, 10);
    const updatedMonthlyWickets = parseInt(formData.monthlyWickets, 10) + parseInt(formData.newWickets, 10);

    const updatedPlayer = {
      ...player,
      runs: updatedRuns,
      wickets: updatedWickets,
      matches: updatedMatches,
      monthlyRuns: updatedMonthlyRuns,
      monthlyWickets: updatedMonthlyWickets,
      runsLog: [...(player.runsLog || []), { date: new Date(), runs: parseInt(formData.newRuns, 10) }],
      wicketsLog: [...(player.wicketsLog || []), { date: new Date(), wickets: parseInt(formData.newWickets, 10) }],
    };

    onSave(updatedPlayer);

    setFormData((prevFormData) => ({
      ...prevFormData,
      matches: updatedMatches,
      monthlyRuns: updatedMonthlyRuns,
      monthlyWickets: updatedMonthlyWickets,
      newRuns: 0,
      newWickets: 0,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex  justify-center pt-8 p-4 h-full overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 overflow-auto max-h-[90vh]">
        <div className="relative flex items-center justify-center mb-8">
          <img
            src={player.image}
            alt={player.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Player Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="jerseyNo" className="block text-sm font-medium text-gray-700">Jersey Number</label>
              <input
                type="number"
                id="jerseyNo"
                name="jerseyNo"
                value={formData.jerseyNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Matches</label>
              <div className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 px-3 py-2">{formData.matches}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Existing Runs</label>
              <div className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 px-3 py-2">{formData.runs}</div>
            </div>
            <div>
              <label htmlFor="newRuns" className="block text-sm font-medium text-gray-700">Add New Runs</label>
              <input
                type="number"
                id="newRuns"
                name="newRuns"
                value={formData.newRuns}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Existing Wickets</label>
              <div className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 px-3 py-2">{formData.wickets}</div>
            </div>
            <div>
              <label htmlFor="newWickets" className="block text-sm font-medium text-gray-700">Add New Wickets</label>
              <input
                type="number"
                id="newWickets"
                name="newWickets"
                value={formData.newWickets}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Runs This Month</label>
              <div className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 px-3 py-2">{formData.monthlyRuns}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wickets This Month</label>
              <div className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 px-3 py-2">{formData.monthlyWickets}</div>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="subrole" className="block text-sm font-medium text-gray-700">Sub Role</label>
              <input
                type="text"
                id="subrole"
                name="subrole"
                value={formData.subrole}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="bestScore" className="block text-sm font-medium text-gray-700">Best Score</label>
              <input
                type="text"
                id="bestScore"
                name="bestScore"
                value={formData.bestScore}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="instaUrl" className="block text-sm font-medium text-gray-700">Instagram URL</label>
              <input
                type="url"
                id="instaUrl"
                name="instaUrl"
                value={formData.instaUrl}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerEditForm;
