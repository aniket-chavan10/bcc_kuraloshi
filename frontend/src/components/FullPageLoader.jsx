// src/components/FullPageLoader.jsx
import React from 'react';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-orange-600 fle flex-col">
      <video
        src="/video/logo_video.mp4"
        autoPlay
        loop
        muted
        className="h-32 md:h-48"
      />
      <h1 className='text-2xl font-black text-white text-center'>BHAIRAVNATH CRICKET CLUB KURALOSHI</h1>
    </div>
  );
};

export default FullPageLoader;
