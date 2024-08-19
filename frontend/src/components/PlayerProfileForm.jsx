import React, { useState, useEffect } from "react";
import { updatePlayerProfile } from "../services/api";

const roles = ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"];
const subroles = ["Captain", "Vice Captain", "Wicketkeeper", "Tail-Ender", "Middle-Order", "Opener", "Junior"];

const PlayerProfileForm = ({ player, onSave, onCancel }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    jerseyNo: "",
    age: "",
    image: null,
    role: "",
    subrole: "",
    bestScore: "",
    instaUrl: "",
  });

  useEffect(() => {
    setProfileData({
      name: player.name || "",
      jerseyNo: player.jerseyNo || "",
      age: player.age || "",
      image: player.image || null,
      role: player.role || "",
      subrole: player.subrole || "",
      bestScore: player.bestScore || "",
      instaUrl: player.instaUrl || "",
    });
  }, [player]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData({
      ...profileData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach((key) => {
        formData.append(key, profileData[key]);
      });
      await updatePlayerProfile(player._id, formData);
      onSave({ ...player, ...profileData });
    } catch (error) {
      console.error("Failed to update player profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-auto flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Edit Player Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="jerseyNo" className="block text-gray-700">Jersey Number:</label>
              <input
                type="text"
                id="jerseyNo"
                name="jerseyNo"
                value={profileData.jerseyNo}
                onChange={handleChange}
                placeholder="Jersey Number"
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="age" className="block text-gray-700">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="image" className="block text-gray-700">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 file:border-none file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded"
              />
            </div>
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="role" className="block text-gray-700">Role:</label>
              <select
                id="role"
                name="role"
                value={profileData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded outline-none"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="subrole" className="block text-gray-700">Subrole:</label>
              <select
                id="subrole"
                name="subrole"
                value={profileData.subrole}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded outline-none"
              >
                <option value="">Select Subrole</option>
                {subroles.map((subrole) => (
                  <option key={subrole} value={subrole}>{subrole}</option>
                ))}
              </select>
            </div>
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="bestScore" className="block text-gray-700">Best Score:</label>
              <input
                type="text"
                id="bestScore"
                name="bestScore"
                value={profileData.bestScore}
                onChange={handleChange}
                placeholder="Best Score"
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="instaUrl" className="block text-gray-700">Instagram URL:</label>
              <input
                type="text"
                id="instaUrl"
                name="instaUrl"
                value={profileData.instaUrl}
                onChange={handleChange}
                placeholder="Instagram URL"
                className="w-full p-2 border border-gray-300 rounded outline-none"
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

export default PlayerProfileForm;
