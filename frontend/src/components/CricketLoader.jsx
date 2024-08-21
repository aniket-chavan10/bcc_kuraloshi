import React from 'react';

const CricketLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500">
      <div className="relative w-16 h-16">
        {/* Tennis ball */}
        <div className="w-16 h-16 rounded-full bg-white border-4 border-orange-600 relative animate-spin">
          {/* Stripes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-2 bg-orange-600 rounded-full rotate-45" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-2 bg-orange-600 rounded-full -rotate-45" />
          </div>
        </div>
      </div>
      <span className="ml-4 text-white text-lg font-semibold">Loading...</span>
    </div>
  );
};

export default CricketLoader;
