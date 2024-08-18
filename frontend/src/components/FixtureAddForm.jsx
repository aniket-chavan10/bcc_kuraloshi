import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addFixtureData } from '../services/api';

const FixtureAddForm = () => {
  const [fixtureData, setFixtureData] = useState({
    date: '',
    matchNumber: '',
    matchStatus: 'upcoming',
    team1Name: '',
    team1Score: '0/0',
    team1Logo: null,
    team2Name: '',
    team2Score: '0/0',
    team2Logo: null,
    matchResult: 'Match is yet to begin',
    venue: '',
    matchTime: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const addedFixture = await addFixtureData(fixtureData);
      console.log('Fixture added successfully:', addedFixture);
      setSuccessMessage('Fixture added successfully!');
      setErrorMessage('');
      setFixtureData({
        date: '',
        matchNumber: '',
        matchStatus: 'upcoming',
        team1Name: '',
        team1Score: '0/0',
        team1Logo: null,
        team2Name: '',
        team2Score: '0/0',
        team2Logo: null,
        matchResult: 'Match is yet to begin',
        venue: '',
        matchTime: '',
      });
    } catch (error) {
      console.error('Error adding fixture:', error);
      setErrorMessage('Failed to add fixture. Please try again.');
      setSuccessMessage('');
      setTimeout(() => navigate(-1), 2000); // Redirect to a specific path
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'team1Logo' || name === 'team2Logo') {
      setFixtureData({
        ...fixtureData,
        [name]: files[0],
      });
    } else {
      setFixtureData({
        ...fixtureData,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-4 overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Add New Fixture</h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded relative mb-3" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative mb-3" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="date" className="block text-gray-700">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={fixtureData.date}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="matchNumber" className="block text-gray-700">Match Number:</label>
              <input
                type="text"
                id="matchNumber"
                name="matchNumber"
                value={fixtureData.matchNumber}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="matchStatus" className="block text-gray-700">Match Status:</label>
              <select
                id="matchStatus"
                name="matchStatus"
                value={fixtureData.matchStatus}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="team1Name" className="block text-gray-700">Team 1 Name:</label>
              <input
                type="text"
                id="team1Name"
                name="team1Name"
                value={fixtureData.team1Name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="team1Score" className="block text-gray-700">Team 1 Score:</label>
              <input
                type="text"
                id="team1Score"
                name="team1Score"
                value={fixtureData.team1Score}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="team1Logo" className="block text-gray-700">Team 1 Logo:</label>
              <input
                type="file"
                id="team1Logo"
                name="team1Logo"
                onChange={handleInputChange}
                required
                accept="image/*"
                className="w-full border border-gray-300 rounded p-1 file:border-none file:bg-blue-500 file:text-white file:py-1 file:px-3 file:rounded"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="team2Name" className="block text-gray-700">Team 2 Name:</label>
              <input
                type="text"
                id="team2Name"
                name="team2Name"
                value={fixtureData.team2Name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="team2Score" className="block text-gray-700">Team 2 Score:</label>
              <input
                type="text"
                id="team2Score"
                name="team2Score"
                value={fixtureData.team2Score}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="team2Logo" className="block text-gray-700">Team 2 Logo:</label>
              <input
                type="file"
                id="team2Logo"
                name="team2Logo"
                onChange={handleInputChange}
                required
                accept="image/*"
                className="w-full border border-gray-300 rounded p-1 file:border-none file:bg-blue-500 file:text-white file:py-1 file:px-3 file:rounded"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="matchResult" className="block text-gray-700">Match Result:</label>
              <textarea
                id="matchResult"
                name="matchResult"
                value={fixtureData.matchResult}
                onChange={handleInputChange}
                rows="3"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              ></textarea>
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="venue" className="block text-gray-700">Venue:</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={fixtureData.venue}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="p-3 rounded border border-gray-300">
              <label htmlFor="matchTime" className="block text-gray-700">Match Time:</label>
              <input
                type="time"
                id="matchTime"
                name="matchTime"
                value={fixtureData.matchTime}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>
          <div className="text-center mt-4 flex justify-center gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              {submitting ? 'Submitting...' : 'Add Fixture'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FixtureAddForm;
