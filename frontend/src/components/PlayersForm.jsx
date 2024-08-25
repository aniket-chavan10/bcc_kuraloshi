import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPlayerData } from "../services/api";

const roles = ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"];
const subroles = ["Captain", "Wicketkeeper", "Vice Captain", "Tail-Ender", "Middle-Order", "Opener", "Junior"];

const PlayersForm = () => {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    jerseyNo: "",
    matches: "",
    runs: "",
    wickets: "",
    age: "",
    image: null,
    role: "",
    subrole: "",
    bestScore: "",
    instaUrl: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    for (const key in formData) {
      if (key === "image" && formData.image) {
        data.append("image", formData.image);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await addPlayerData(data);
      console.log("Player added successfully:", response);
      setFormData(initialFormData);
      setImagePreview(null);
      setSuccess("Player added successfully!");
      setError("");
      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      console.error("Failed to add player:", error);
      setError("Failed to add player. Please try again.");
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setImagePreview(null);
    setError("");
    setSuccess("");
    setTimeout(() => navigate(-1), 0);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-auto max-h-screen">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add New Player</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="name" className="block text-gray-700">Player Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter player name"
                className="w-full p-2 border border-blue-300 rounded outline-none"
                required
              />
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="jerseyNo" className="block text-gray-700">Jersey Number:</label>
              <input
                type="number"
                id="jerseyNo"
                name="jerseyNo"
                value={formData.jerseyNo}
                onChange={handleChange}
                placeholder="Enter jersey number"
                className="w-full p-2 border border-blue-300 rounded outline-none"
                required
              />
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="matches" className="block text-gray-700">Matches Played:</label>
              <input
                type="number"
                id="matches"
                name="matches"
                value={formData.matches}
                onChange={handleChange}
                placeholder="Enter total matches played"
                className="w-full p-2 border border-blue-300 rounded outline-none"
              />
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="runs" className="block text-gray-700">Total Runs:</label>
              <input
                type="number"
                id="runs"
                name="runs"
                value={formData.runs}
                onChange={handleChange}
                placeholder="Enter total runs"
                className="w-full p-2 border border-blue-300 rounded outline-none"
              />
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="wickets" className="block text-gray-700">Total Wickets:</label>
              <input
                type="number"
                id="wickets"
                name="wickets"
                value={formData.wickets}
                onChange={handleChange}
                placeholder="Enter total wickets"
                className="w-full p-2 border border-blue-300 rounded outline-none"
              />
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="age" className="block text-gray-700">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter player age"
                className="w-full p-2 border border-blue-300 rounded outline-none"
              />
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="role" className="block text-gray-700">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded outline-none"
              >
                <option value="">Select role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="subrole" className="block text-gray-700">Subrole:</label>
              <select
                id="subrole"
                name="subrole"
                value={formData.subrole}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded outline-none"
              >
                <option value="">Select subrole</option>
                {subroles.map((subrole, index) => (
                  <option key={index} value={subrole}>{subrole}</option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="bestScore" className="block text-gray-700">Best Score:</label>
              <input
                type="number"
                id="bestScore"
                name="bestScore"
                value={formData.bestScore}
                onChange={handleChange}
                placeholder="Enter best score"
                className="w-full p-2 border border-blue-300 rounded outline-none"
              />
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="instaUrl" className="block text-gray-700">Instagram URL:</label>
              <input
                type="url"
                id="instaUrl"
                name="instaUrl"
                value={formData.instaUrl}
                onChange={handleChange}
                placeholder="Enter Instagram profile URL"
                className="w-full p-2 border border-blue-300 rounded outline-none"
              />
            </div>

            <div className="p-4 rounded border border-gray-300 bg-blue-50">
              <label htmlFor="image" className="block text-gray-700">Player Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded outline-none"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Player Preview"
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Submitting..." : "Add Player"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white font-semibold py-2 px-6 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayersForm;
