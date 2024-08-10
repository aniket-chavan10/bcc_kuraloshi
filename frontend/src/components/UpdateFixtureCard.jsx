import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const UpdateFixtureCard = ({ fixture, onEditClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (fixture) {
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
        Match #{fixture.matchNumber}
      </h3>
      <p className="text-gray-700 mb-2">
        <strong className="font-semibold text-gray-900">Date:</strong> {fixture.date}
      </p>
      <p className="text-gray-700 mb-2">
        <strong className="font-semibold text-gray-900">Match Status:</strong> {fixture.matchStatus}
      </p>
      <div className="text-gray-700 mb-2 flex items-center">
        <strong className="font-semibold text-gray-900">Team 1:</strong>
        <span className="ml-2 flex-1">{fixture.team1.name}</span>
        <span className="font-semibold text-orange-600">{fixture.team1.score}</span>
      </div>
      <div className="text-gray-700 mb-2 flex items-center">
        <strong className="font-semibold text-gray-900">Team 2:</strong>
        <span className="ml-2 flex-1">{fixture.team2.name}</span>
        <span className="font-semibold text-orange-600">{fixture.team2.score}</span>
      </div>
      <p className="text-gray-700 mb-2">
        <strong className="font-semibold text-gray-900">Venue:</strong> {fixture.venue}
      </p>
      <p className="text-gray-700 mb-4">
        <strong className="font-semibold text-gray-900">Match Time:</strong> {fixture.matchTime}
      </p>
      <p className="text-gray-700 mb-4">
        <strong className="font-semibold text-gray-900">Match Result:</strong> {fixture.matchResult}
      </p>
      <div className="flex justify-end">
        <button
          onClick={() => onEditClick(fixture._id)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default UpdateFixtureCard;
