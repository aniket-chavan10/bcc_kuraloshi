import React from "react";
import cricketBallImage from "../assets/images/ball-png.png"; // Add a cricket ball image
import cricketSceneImage from "../assets/images/cricket_bg.png"; // Add a large cricket-related image
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 mt-16">
        {/* Main content container */}
        <div className="flex items-center flex-col md:flex-row">
          {/* 404 section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <h1
                className="font-bold text-orange-600 -mr-8"
                style={{ fontSize: "12rem" }}
              >
                4
              </h1>

              <img
                src={cricketBallImage}
                alt="Cricket Ball"
                className="w-44 h-36 mx-2"
              />

              <h1
                className="font-bold text-orange-600 -ml-8"
                style={{ fontSize: "12rem" }}
              >
                4
              </h1>
            </div>

            {/* Page Not Found text below 404 */}
            <p className=" font-black text-orange-600 uppercase -mt-16"  style={{ fontSize: "2.2rem" }}>
              Page Not Found
            </p>
          </div>

          {/* Cricket scene image on the right */}
          <div className="ml-10 mt-8 md:mt-0">
            <img
              src={cricketSceneImage}
              alt="Cricket Scene"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PageNotFound;
