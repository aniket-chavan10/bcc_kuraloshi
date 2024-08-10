import React, { useState, useEffect } from 'react';

const FullPageLoader = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById('club-video');

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleLoadedData);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-orange-600 flex-col">
      <video
        id="club-video"
        src="/video/logo_video.mp4"
        autoPlay
        loop
        muted
        className={`w-3/4 max-w-xs md:max-w-sm lg:max-w-md transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        preload="auto"
      />
      <h1 className="text-lg md:text-2xl lg:text-3xl font-black text-white text-center mt-4 px-4">
        BHAIRAVNATH CRICKET CLUB KURALOSHI
      </h1>
    </div>
  );
};

export default FullPageLoader;
