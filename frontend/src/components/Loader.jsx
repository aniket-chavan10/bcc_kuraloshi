import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 bg-orange-600 animate-flip"></div>
      <style jsx>{`
        .animate-flip {
          animation: flip 1s infinite;
        }

        @keyframes flip {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(180deg);
          }
          100% {
            transform: rotateX(180deg) rotateY(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
