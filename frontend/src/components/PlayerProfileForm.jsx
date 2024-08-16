import React, { useState, useEffect } from "react";
import { updatePlayerProfile } from "../services/api";

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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Edit Player Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="jerseyNo"
            value={profileData.jerseyNo}
            onChange={handleChange}
            placeholder="Jersey Number"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded"
          />
          <input
            type="text"
            name="role"
            value={profileData.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="subrole"
            value={profileData.subrole}
            onChange={handleChange}
            placeholder="Subrole"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="bestScore"
            value={profileData.bestScore}
            onChange={handleChange}
            placeholder="Best Score"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="instaUrl"
            value={profileData.instaUrl}
            onChange={handleChange}
            placeholder="Instagram URL"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
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
