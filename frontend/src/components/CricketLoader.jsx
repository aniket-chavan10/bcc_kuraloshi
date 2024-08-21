import React from 'react';

const CricketLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500">
      <div className="relative w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full" />
        </div>
      </div>
      <span className="ml-4 text-white text-lg font-semibold">Loading...</span>
    </div>
  );
};

export default CricketLoader;
