import React, { useEffect, useState } from "react";
import { fetchPlayersData } from "../services/api"; // Adjust the import path as needed
import playerBg from "../assets/images/team_player_bg.jpg";

const ImageWithLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-auto">
      {loading && (
        <div className="absolute inset-10 flex items-center justify-center bg-white">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

function AllTeam() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchPlayersData(); // Fetch data from backend
        console.log("Players data:", data); // Log players data to check structure

        if (data.length === 0) {
          setError("No players data found");
        } else {
          setPlayers(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch player data:", error);
        setError("Failed to fetch player data");
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  // Group players by role
  const batsmen = players.filter((player) => player.role === "Batsman");
  const bowlers = players.filter((player) => player.role === "Bowler");
  const allRounders = players.filter((player) => player.role === "All-rounder");

  const Card = ({ player }) => (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg group w-full max-w-xs mx-auto h-96 md:h-80 md:w-64"
      style={{ backgroundImage: `url(${playerBg})` }}
    >
      <ImageWithLoader
        src={player.image}
        alt={player.name}
      />
      <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-80 text-white px-2 py-1 rounded-t-lg transform translate-y-28 sm:translate-y-28 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <h3 className="text-2xl sm:text-2xl font-semibold text-orange-600 capitalize">
          {player.name}
        </h3>
        <hr className="border-t border-gray-50 opacity-40" />
        <p className="text-gray-50 text-md sm:text-base inline items-center">
          {player.role}
          <span className="border-l border-white mx-3 h-4 opacity-40"></span>
          Kuraloshi
        </p>
        <hr className="border-1 border-white opacity-40" />
        <div className="flex justify-between">
          <div className="flex items-center pt-1">
            <div className="text-center flex flex-col bg-yellow-200 rounded bg-opacity-20 w-20 sm:w-16">
              <span className="block text-lg font-bold">{player.matches}</span>
              <span className="text-sm sm:text-sm">Matches</span>
            </div>
            <div className="border-l border-white mx-3 h-8 opacity-40"></div>
            <div className="text-center flex flex-col bg-yellow-200 rounded bg-opacity-20 w-20 sm:w-16">
              <span className="block text-lg font-bold">{player.runs}</span>
              <span className="text-sm sm:text-sm">Runs</span>
            </div>
            <div className="border-l border-white mx-3 h-8 opacity-40"></div>
            <div className="text-center flex flex-col bg-yellow-200 rounded bg-opacity-20 w-20 sm:w-16">
              <span className="block text-lg font-bold">
                {player.role === "Batsman" ? "NA" : player.wickets || "-"}
              </span>
              <span className="text-sm sm:text-sm">Wickets</span>
            </div>
          </div>
        </div>
        <a
          href={player.instaUrl} // Link to Instagram profile
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Security feature for external links
          className="mt-4 w-full block bg-gradient-to-r from-orange-600 to-orange-500  text-white px-2 sm:px-4 py-2 rounded hover:bg-gradient-to-b transition duration-300 text-center cursor-pointer"
        >
          View Profile
        </a>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-10 md:mt-16 mt-5 px-2 sm:px-4 ">
      {/* Batsmen Section */}
      {batsmen.length > 0 && (
        <div className="mb-8">
          <div className="text-center relative my-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg capitalize">
              Batsman
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {batsmen.map((player) => (
              <Card key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}

      {/* All-Rounders Section */}
      {allRounders.length > 0 && (
        <div className="mb-8">
          <div className="text-center relative mb-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg capitalize">
              All-rounder
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allRounders.map((player) => (
              <Card key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}

      {/* Bowlers Section */}
      {bowlers.length > 0 && (
        <div>
          <div className="text-center relative mb-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg capitalize">
              Bowler
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bowlers.map((player) => (
              <Card key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTeam;
