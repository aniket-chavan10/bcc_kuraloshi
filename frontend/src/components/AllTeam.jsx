import React, { useEffect, useState, useRef } from "react";
import { fetchPlayersData } from "../services/api";
import playerBg from "../assets/images/team_player_bg.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./Loader"; // Import your custom Loader component

gsap.registerPlugin(ScrollTrigger);

const ImageWithLoader = ({ src, alt, onLoad }) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = onLoad;
  }, [src, onLoad]);

  return <img src={src} alt={alt} className="w-full h-full object-contain" />;
};

function AllTeam() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  const cardRefs = useRef([]);
  const [cardLoading, setCardLoading] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchPlayersData();
        console.log("Players data:", data);

        if (data.length === 0) {
          setError("No players data found");
        } else {
          setPlayers(data);
          const initialLoadingState = data.reduce((acc, player) => {
            acc[player._id] = true; // Mark each card as loading initially
            return acc;
          }, {});
          setCardLoading(initialLoadingState);
        }
      } catch (error) {
        console.error("Failed to fetch player data:", error);
        setError("Failed to fetch player data");
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [players]);

  const handleImageLoad = (id) => {
    setCardLoading((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  const batsmen = players.filter((player) => player.role === "Batsman");
  const bowlers = players.filter((player) => player.role === "Bowler");
  const allRounders = players.filter(
    (player) => player.role === "All-rounder"
  );

  const Card = ({ player, index }) => {
    const getSubroleAbbreviation = (subrole) => {
      switch (subrole) {
        case "Captain":
          return "C";
        case "Vice Captain":
          return "Vc";
        case "Wicketkeeper":
          return "Wk";
        default:
          return null;
      }
    };

    const subroleAbbreviation = getSubroleAbbreviation(player.subrole);
    const isJunior = player.subrole === "Junior";

    return (
      <div
        ref={(el) => (cardRefs.current[index] = el)}
        className={`relative overflow-hidden rounded-lg shadow-lg group w-full max-w-xs mx-auto h-96 md:h-80 md:w-64 transition-opacity duration-300 ease-in-out ${cardLoading[player._id] ? 'opacity-50' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${playerBg})` }}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-300 ease-in-out ${cardLoading[player._id] ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: 10 }}
        >
          <Loader /> {/* Loader for each individual card */}
        </div>
        <div className={`h-full ${cardLoading[player._id] ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}>
          <ImageWithLoader
            src={player.image}
            alt={player.name}
            onLoad={() => handleImageLoad(player._id)}
          />
        </div>
        {subroleAbbreviation && (
          <div className="absolute top-0 right-0 m-2 text-white bg-gray-500 text-xs font-bold px-2 py-1 rounded-full">
            {subroleAbbreviation}
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-80 text-white px-2 py-1 rounded-t-lg transform translate-y-28 sm:translate-y-28 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <h3 className="text-2xl sm:text-2xl font-semibold text-orange-500 capitalize">
            {player.name}
            {isJunior && <span className="text-white text-sm font-extralight "> (Jr)</span>}
          </h3>
          <hr className="border-t border-gray-50 opacity-40" />
          <p className="text-gray-50 text-md sm:text-base inline items-center">
            {player.role}
            <span className="border-l border-white mx-3 h-4 opacity-40"></span>
            Kuraloshi
            <span className="border-l border-white mx-3 h-4 opacity-40"></span>
            {player.age}'y
          </p>
          <hr className="border-1 border-white opacity-40" />
          <div className="flex justify-between">
            <div className="flex items-center pt-1">
              <div className="text-center flex flex-col bg-yellow-200 rounded bg-opacity-20 w-20 sm:w-16">
                <span className="block text-lg font-bold">
                  {player.matches}
                </span>
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
            href={player.instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full block bg-gradient-to-r from-orange-600 to-orange-500 text-white px-2 sm:px-4 py-2 rounded hover:bg-gradient-to-b transition duration-300 text-center cursor-pointer"
          >
            View Profile
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10 md:mt-16 mt-1 px-2 sm:px-4">
      {batsmen.length > 0 && (
        <div className="mb-8">
          <div className="text-center relative my-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg capitalize">
              BATSMEN'S
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {batsmen.map((player, index) => (
              <Card key={player._id} player={player} index={index} />
            ))}
          </div>
        </div>
      )}
      {allRounders.length > 0 && (
        <div className="mb-8">
          <div className="text-center relative mb-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg capitalize">
              ALL-ROUNDER'S
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allRounders.map((player, index) => (
              <Card key={player._id} player={player} index={index} />
            ))}
          </div>
        </div>
      )}
      {bowlers.length > 0 && (
        <div className="mb-8">
          <div className="text-center relative mb-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg capitalize">
              BOWLER'S
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bowlers.map((player, index) => (
              <Card key={player._id} player={player} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTeam;
