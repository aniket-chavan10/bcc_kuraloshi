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
  const [isSubmitting, setIsSubmitting] = useState(false); // New state

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
    setIsSubmitting(true); // Set submitting state to true
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
      setIsSubmitting(false); // Set submitting state to false
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields as before... */}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
              disabled={isSubmitting} // Disable button when submitting
            >
              {isSubmitting ? "Submitting..." : "Add Player"} {/* Conditional text */}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
              disabled={isSubmitting} // Optionally disable cancel button as well
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
