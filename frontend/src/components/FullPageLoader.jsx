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
      {!videoLoaded && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}
      <video
        id="club-video"
        src="/video/logo_video.mp4"
        autoPlay
        loop
        muted
        className={`h-48 md:h-48 transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        preload="auto"
      />
      <h1 className='text-2xl font-black text-white text-center mt-4'>BHAIRAVNATH CRICKET CLUB KURALOSHI</h1>
    </div>
  );
};

export default FullPageLoader;
