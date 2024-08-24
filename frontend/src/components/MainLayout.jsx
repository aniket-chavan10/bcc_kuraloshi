import React, { useState, useEffect, useRef } from 'react';
import Carousel from './Carousel';
import RecentFixture from './RecentFixture';
import Loader from '../components/Loader'; // Import the loader

const MainLayout = () => {
  const [isCarouselLoading, setIsCarouselLoading] = useState(true);
  const [isRecentFixtureLoading, setIsRecentFixtureLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Simulate fetching data for both Carousel and RecentFixture
    setTimeout(() => {
      setIsCarouselLoading(false);
      setIsRecentFixtureLoading(false);
    }, 3000); // 3-second delay to simulate data fetching
  }, []);

  if (isCarouselLoading || isRecentFixtureLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <Loader /> {/* Using your custom Loader component */}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-stretch max-w-7xl mx-auto mt-10 lg:mt-24 w-full">
      <div className="lg:w-3/4 w-full flex-shrink-0" ref={carouselRef}>
        <Carousel />
      </div>
      <div className="lg:w-1/4 w-full lg:pl-6 mt-4 lg:mt-0 flex-shrink-0">
        <RecentFixture />
      </div>
    </div>
  );
};

export default MainLayout;
