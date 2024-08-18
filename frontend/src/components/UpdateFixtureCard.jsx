import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const UpdateFixtureCard = ({ fixture, onEditClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [fixture]);

  if (!fixture) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div
      ref={cardRef}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-xl mx-auto transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        {fixture.matchNumber !== undefined ? `Match #${fixture.matchNumber}` : "Match Number: Data not available"}
      </h3>
      <p className="text-gray-700 mb-2">
        <strong className="font-semibold text-gray-900">Date:</strong> 
        {fixture.date || "Date not available"}
      </p>
      <p className="text-gray-700 mb-2">
        <strong className="font-semibold text-gray-900">Match Status:</strong> 
        {fixture.matchStatus || "Status not available"}
      </p>
      <div className="text-gray-700 mb-2 flex items-center">
        <strong className="font-semibold text-gray-900">Team 1:</strong>
        <span className="ml-2 flex-1">
          {fixture.team1Name || "Team 1 name not available"}
        </span>
        <span className="font-semibold text-orange-600">
          {fixture.team1Score !== undefined ? fixture.team1Score : "Score not available"}
        </span>
      </div>
      <div className="text-gray-700 mb-2 flex items-center">
        <strong className="font-semibold text-gray-900">Team 2:</strong>
        <span className="ml-2 flex-1">
          {fixture.team2Name || "Team 2 name not available"}
        </span>
        <span className="font-semibold text-orange-600">
          {fixture.team2Score !== undefined ? fixture.team2Score : "Score not available"}
        </span>
      </div>
      <p className="text-gray-700 mb-2">
        <strong className="font-semibold text-gray-900">Venue:</strong> 
        {fixture.venue || "Venue not available"}
      </p>
      <p className="text-gray-700 mb-2">
        <strong className="font-semibold text-gray-900">Match Result:</strong> 
        {fixture.matchResult || "Result not available"}
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        onClick={() => onEditClick(fixture._id)}
      >
        Edit Fixture
      </button>
    </div>
  );
};

export default UpdateFixtureCard;
