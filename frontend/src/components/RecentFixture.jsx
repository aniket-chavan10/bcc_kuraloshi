import React, { useContext, useEffect, useState } from "react";
import { fetchFixtures } from "../services/api";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import Loader from '../components/Loader';
import AppContext from '../context/AppContext';

const RecentFixture = () => {
  const { fixtures, setFixtures } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFixtures = async () => {
      try {
        const data = await fetchFixtures();
        setFixtures(data.reverse());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (fixtures.length === 0) { // Fetch only if fixtures are not already available
      getFixtures();
    } else {
      setLoading(false); // Skip loading if fixtures are already available
    }
  }, [fixtures, setFixtures]);

  if (loading) {
    return (
      <div className="relative w-full max-w-full mx-auto overflow-hidden md:mt-0 mt-0">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-950 text-orange-500 p-3 sm:p-4 min-h-full flex flex-col">
      {fixtures.slice(0, 1).map((fixture) => {
        const date = new Date(fixture.date);
        const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}, ${date.getFullYear()}`;
        const formattedDay = date.toLocaleDateString("en-US", { weekday: "long" });

        return (
          <div key={fixture._id} className="flex flex-col items-center flex-grow">
            <div className="text-center mb-1 sm:mb-4">
              <h3 className="text-xs sm:text-sm uppercase">{formattedDate}</h3>
              <p className="text-xs text-gray-400">{formattedDay}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-1 sm:mb-4 w-full">
              <div className="flex items-center justify-center gap-1 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1">
                  <img
                    className="w-10 h-auto sm:w-12 sm:h-14 object-contain"
                    src={fixture.team1Logo || '/default-logo.png'}
                    alt={`${fixture.team1Name || 'Team 1'} logo`}
                  />
                  <p className="text-xs sm:text-xl bg-gradient-to-tr from-slate-800 p-1 sm:p-2 bg-slate-900 text-white">
                    {fixture.team1Score || 'N/A'}
                  </p>
                </div>
                <div className="text-center p-1 sm:p-1">
                  <h3 className="text-xs sm:text-sm">VS</h3>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-xs sm:text-xl bg-gradient-to-tr from-slate-800 p-1 sm:p-2 bg-slate-900 text-white">
                    {fixture.team2Score || 'N/A'}
                  </p>
                  <img
                    className="w-8 h-auto sm:w-12 sm:h-12 object-cover"
                    src={fixture.team2Logo || '/default-logo.png'}
                    alt={`${fixture.team2Name || 'Team 2'} logo`}
                  />
                </div>
              </div>
            </div>
            <div className="text-center uppercase leading-tight font-semibold mb-2 sm:mb-8">
              <p className="text-xs sm:text-sm opacity-80">{fixture.matchResult || 'Result not available'}</p>
            </div>
            <div className="flex flex-col text-center my-2 sm:my-5">
              <h1 className="text-zinc-100 text-base sm:text-2xl font-medium">STAY CONNECTED</h1>
              <h1 className="font-bold text-base sm:text-2xl">WITH BCC KURALOSHI FAMILY</h1>
            </div>

            <div className="flex flex-col text-center mt-2 sm:mt-8">
              <h1 className="text-xs sm:text-sm text-white uppercase mb-2">Follow us on</h1>
              <div className="flex flex-row sm:flex-col justify-center items-center gap-1 sm:gap-4">
                <a
                  href="https://www.instagram.com/"
                  className="flex items-center text-white bg-gradient-to-r from-amber-500 to-pink-500 py-1 px-2 sm:py-1 sm:px-4 rounded"
                >
                  <FaInstagram className="mr-1 sm:mr-2 text-lg sm:text-2xl" />
                  <span className="text-xs sm:text-base">Instagram</span>
                </a>
                <a
                  href="https://www.youtube.com/@BCCKURULOSHI"
                  className="flex items-center text-white bg-red-600 py-1 px-2 sm:py-1 sm:px-4 rounded"
                >
                  <FaYoutube className="mr-1 sm:mr-2 text-lg sm:text-2xl" />
                  <span className="text-xs sm:text-base">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentFixture;
