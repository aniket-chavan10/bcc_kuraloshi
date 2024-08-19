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
    }
  };

  const handleCancel = () => {
    // Reset the form or close it based on your implementation
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Player Name */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            {/* Jersey Number */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="jerseyNo" className="block text-gray-700">Jersey Number:</label>
              <input
                type="number"
                id="jerseyNo"
                name="jerseyNo"
                value={formData.jerseyNo}
                onChange={handleChange}
                placeholder="Jersey Number"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            {/* Matches */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="matches" className="block text-gray-700">Matches:</label>
              <input
                type="number"
                id="matches"
                name="matches"
                value={formData.matches}
                onChange={handleChange}
                placeholder="Matches"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            {/* Runs */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="runs" className="block text-gray-700">Runs:</label>
              <input
                type="number"
                id="runs"
                name="runs"
                value={formData.runs}
                onChange={handleChange}
                placeholder="Runs"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            {/* Wickets */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="wickets" className="block text-gray-700">Wickets:</label>
              <input
                type="number"
                id="wickets"
                name="wickets"
                value={formData.wickets}
                onChange={handleChange}
                placeholder="Wickets"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            {/* Age */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="age" className="block text-gray-700">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            {/* Image Upload */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="image" className="block text-gray-700">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 file:border-none file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Image Preview" className="mt-2 max-w-full h-auto" />
              )}
            </div>

            {/* Role */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="role" className="block text-gray-700">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Subrole */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="subrole" className="block text-gray-700">Subrole:</label>
              <select
                id="subrole"
                name="subrole"
                value={formData.subrole}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded outline-none"
              >
                <option value="">Select Subrole</option>
                {subroles.map((subrole, index) => (
                  <option key={index} value={subrole}>{subrole}</option>
                ))}
              </select>
            </div>

            {/* Best Score */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="bestScore" className="block text-gray-700">Best Score:</label>
              <input
                type="text"
                id="bestScore"
                name="bestScore"
                value={formData.bestScore}
                onChange={handleChange}
                placeholder="Best Score"
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            {/* Instagram URL */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="instaUrl" className="block text-gray-700">Instagram URL:</label>
              <input
                type="url"
                id="instaUrl"
                name="instaUrl"
                value={formData.instaUrl}
                onChange={handleChange}
                placeholder="Instagram URL"
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
            >
              Add Player
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default PlayersForm;
