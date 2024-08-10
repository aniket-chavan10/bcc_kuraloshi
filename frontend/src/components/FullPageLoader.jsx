import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const FullPageLoader = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const videoElement = document.getElementById('club-video');

    const handleLoadedData = () => {
      setVideoLoaded(true);

      // Animate text after video is fully visible
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
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
    <div className="fixed inset-0 z-50 flex items-center md:justify-center bg-orange-600 flex-col">
      <video
        id="club-video"
        src="/video/logo_video.mp4"
        autoPlay
        loop
        muted
        className={`w-40 md:w-48 transition-opacity duration-500 mt-36 md:mt-0 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        preload="auto"
      />
      {videoLoaded && (
        <h1
          ref={textRef}
          className="text-lg md:text-2xl lg:text-3xl font-black text-white text-center mt-4 px-4 hidden md:block"
        >
          BHAIRAVNATH CRICKET CLUB KURALOSHI
        </h1>
      )}
    </div>
  );
};

export default FullPageLoader;
