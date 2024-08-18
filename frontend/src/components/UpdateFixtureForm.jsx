import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFixtureById, updateFixtureData } from "../services/api";

const UpdateFixtureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fixtureData, setFixtureData] = useState({
    matchStatus: "",
    team1Score: "",
    team2Score: "",
    matchResult: "",
    matchDate: "", // Example non-editable field
    venue: "", // Example non-editable field
    matchNumber: "",
    team1Name: "",
    team2Name: "",
    matchTime: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getFixture = async () => {
      try {
        const data = await fetchFixtureById(id);
        setFixtureData({
          matchStatus: data.matchStatus,
          team1Score: data.team1Score,
          team2Score: data.team2Score,
          matchResult: data.matchResult,
          matchDate: data.date, // Set non-editable fields
          venue: data.venue, // Set non-editable fields
          matchNumber: data.matchNumber,
          team1Name: data.team1Name,
          team2Name: data.team2Name,
          matchTime: data.matchTime,
        });
      } catch (error) {
        console.error("Error fetching fixture data:", error);
        setErrorMessage("Failed to load fixture data. Please try again.");
      }
    };

    getFixture();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const updatedFixture = await updateFixtureData(id, {
        matchStatus: fixtureData.matchStatus,
        team1Score: fixtureData.team1Score,
        team2Score: fixtureData.team2Score,
        matchResult: fixtureData.matchResult,
      });
      console.log("API Response:", updatedFixture);
      setSuccessMessage("Fixture updated successfully!");
      setErrorMessage("");
      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      console.error("Failed to update fixture:", error);
      setErrorMessage(`Failed to update fixture. ${error.message}`);
      setSuccessMessage("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFixtureData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-auto flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Update Fixture
        </h2>
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Non-Editable Fields */}
            <div className="p-4 rounded border border-gray-300 bg-gray-100">
              <label htmlFor="matchDate" className="block text-gray-700">
                Match Date:
              </label>
              <p id="matchDate" className="text-gray-600">
                {fixtureData.matchDate}
              </p>
            </div>

            <div className="p-4 rounded border border-gray-300 bg-gray-100">
              <label htmlFor="venue" className="block text-gray-700">
                Venue:
              </label>
              <p id="venue" className="text-gray-600">
                {fixtureData.venue}
              </p>
            </div>

            <div className="p-4 rounded border border-gray-300 bg-gray-100">
              <label htmlFor="matchNumber" className="block text-gray-700">
                Match Number:
              </label>
              <p id="matchNumber" className="text-gray-600">
                {fixtureData.matchNumber}
              </p>
            </div>

            <div className="p-4 rounded border border-gray-300 bg-gray-100">
              <label htmlFor="team1Name" className="block text-gray-700">
                Team 1 Name:
              </label>
              <p id="team1Name" className="text-gray-600">
                {fixtureData.team1Name}
              </p>
            </div>

            <div className="p-4 rounded border border-gray-300 bg-gray-100">
              <label htmlFor="team2Name" className="block text-gray-700">
                Team 2 Name:
              </label>
              <p id="team2Name" className="text-gray-600">
                {fixtureData.team2Name}
              </p>
            </div>

            <div className="p-4 rounded border border-gray-300 bg-gray-100">
              <label htmlFor="matchTime" className="block text-gray-700">
                Match Time:
              </label>
              <p id="matchTime" className="text-gray-600">
                {fixtureData.matchTime}
              </p>
            </div>

            {/* Editable Fields */}
            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="matchStatus" className="block text-gray-700">
                Match Status:
              </label>
              <select
                id="matchStatus"
                name="matchStatus"
                value={fixtureData.matchStatus}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded outline-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="matchResult" className="block text-gray-700">
                Match Result:
              </label>
              <input
                type="text"
                id="matchResult"
                name="matchResult"
                value={fixtureData.matchResult}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="team1Score" className="block text-gray-700">
              {fixtureData.team1Name} Score:
              </label>
              <input
                type="text"
                id="team1Score"
                name="team1Score"
                value={fixtureData.team1Score}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>

            <div className="p-4 rounded border border-gray-300">
              <label htmlFor="team2Score" className="block text-gray-700">
              {fixtureData.team2Name} Score:
              </label>
              <input
                type="text"
                id="team2Score"
                name="team2Score"
                value={fixtureData.team2Score}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="py-2 px-4 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
            >
              {submitting ? "Updating..." : "Update Fixture"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFixtureForm;
