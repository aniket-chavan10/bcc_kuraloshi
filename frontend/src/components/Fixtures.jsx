import React, { useEffect, useState, useRef } from "react";
import { fetchFixtures } from "../services/api";
import { gsap } from "gsap";

const defaultLogo = "/default-image.jpg"; // Path to your default image

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fixtureRefs = useRef([]); // To hold refs for each fixture card

  useEffect(() => {
    const getFixtures = async () => {
      try {
        const data = await fetchFixtures();
        console.log("Data in Fixtures component:", data);
        setFixtures(data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error in Fixtures component:", error);
        setError(error);
        setLoading(false);
      }
    };
    getFixtures();
  }, []);

  useEffect(() => {
    if (fixtures.length > 0) {
      gsap.fromTo(
        fixtureRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, [fixtures]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-16 md:mt-24 mb-10 px-4">
      <ul>
        {fixtures.length === 0 ? (
          <li>No fixtures available</li>
        ) : (
          fixtures.map((fixture, index) => {
            const date = new Date(fixture.date);
            const formattedDate = `${date.getDate()} ${date.toLocaleString(
              "default",
              { month: "long" }
            )}, ${date.getFullYear()}`;
            const formattedDay = date.toLocaleDateString("en-US", {
              weekday: "long",
            });

            // Determine background color based on matchStatus
            const cardBgColor = fixture.matchStatus === 'completed' ? 'bg-gray-100' : 'bg-white';

            return (
              <li
                key={fixture._id}
                ref={(el) => (fixtureRefs.current[index] = el)}
                className={`mb-4  p-4 rounded-lg shadow-md`} // Applied background color to card
              >
                <div className="w-full h-10 bg-orange-500 flex items-center px-4 py-1">
                  <span className="text-white font-bold">
                    {formattedDate} |{" "}
                    <span className="font-thin">{formattedDay}</span>
                  </span>
                </div>
                <div className={`shadow-lg p-3 ${cardBgColor}`}>
                  <div className="flex flex-col md:flex-row mb-4 md:items-center md:space-x-4">
                    <div className="flex flex-col items-center mb-4 md:mb-0 flex-wrap">
                      <h1 className="font-black text-zinc-900 text-xl md:text-2xl">
                        Match {fixture.matchNumber}
                      </h1>
                      <h3 className="font-thin text-center md:text-lg">
                        {fixture.matchStatus}
                      </h3>
                    </div>
                    <div className="flex items-center justify-evenly w-full md:w-auto md:flex-grow">
                      <div className="flex flex-col items-center mx-1 md:mx-4">
                        <img
                          src={fixture.team1Logo}
                          alt={`${fixture.team1Name} logo`}
                          className="max-h-10 md:max-h-16"
                          onError={(e) => {
                            e.target.src = defaultLogo; // Fallback to default image if there's an error
                          }}
                        />
                        <h4 className="font-black text-zinc-900 uppercase text-xs md:text-sm mt-1 leading-tight text-center">
                          {fixture.team1Name}
                        </h4>
                      </div>
                      <div className="flex items-center mx-1 md:mx-4">
                        <h4 className="font-black text-zinc-900 text-md md:text-xl ml-1 md:ml-2">
                          {fixture.team1Score}
                        </h4>
                      </div>
                      <h1 className="bg-orange-600 text-white h-fit py-1 px-2 mx-1 md:mx-4 text-xs md:text-lg">
                        VS
                      </h1>
                      <div className="flex items-center mx-1 md:mx-4">
                        <h4 className="font-black text-zinc-900 text-md md:text-xl mr-1 md:mr-2">
                          {fixture.team2Score}
                        </h4>
                      </div>
                      <div className="flex flex-col items-center mx-1 md:mx-4">
                        <img
                          src={fixture.team2Logo}
                          alt={`${fixture.team2Name} logo`}
                          className="max-h-10 md:max-h-16"
                          onError={(e) => {
                            e.target.src = defaultLogo; // Fallback to default image if there's an error
                          }}
                        />
                        <h4 className="font-black text-zinc-900 uppercase text-xs md:text-sm mt-1 leading-tight text-center">
                          {fixture.team2Name}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:ml-44 md:font-bold my-4 md:my-0 md:order-1">
                    <h4>{fixture.matchResult}</h4>
                  </div>
                  <div className="flex flex-col items-center md:flex-row justify-between text-center mt-4">
                    <h3 className="text-zinc-900 font-bold text-md">
                      {fixture.matchTime}(IST)
                    </h3>
                    <h3 className="text-md">{fixture.venue}</h3>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Fixtures;
