import React from "react";
import Loader from "../components/Loader";
const LoadingOverlay = ({ text }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
      <Loader /> {/* Existing Loader component */}
      <p className="mt-4 text-lg text-gray-700">{text}</p>
    </div>
  );
};

export default LoadingOverlay;
