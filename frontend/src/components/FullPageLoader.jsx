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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-orange-600 flex flex-col">
      {!videoLoaded && (
        <img
          src="/logo.png" // Placeholder image while video loads
          alt="Club Logo"
          className="h-32 md:h-48"
        />
      )}
      <video
        id="club-video"
        src="/video/logo_video.mp4"
        autoPlay
        loop
        muted
        className={`h-32 md:h-48 transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        preload="auto" // Preload video to improve loading time
      />
      <h1 className='text-2xl font-black text-white text-center'>BHAIRAVNATH CRICKET CLUB KURALOSHI</h1>
    </div>
  );
};

export default FullPageLoader;
