import React, { useState, useEffect, useRef } from 'react';
import { fetchCarouselItems } from '../services/api';
import gsap from 'gsap';

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const captionRef = useRef(null); // Reference for the caption element

  useEffect(() => {
    const getCarouselItems = async () => {
      try {
        const data = await fetchCarouselItems();
        setCarouselItems(data.slice(-4));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCarouselItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  useEffect(() => {
    // GSAP animation for the caption text
    gsap.fromTo(
      captionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, [currentIndex]); // Re-run the animation when the slide changes

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading carousel items: {error.message}</p>;
  }

  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden">
      <div className="relative w-full">
        <div
          className="whitespace-nowrap transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="inline-block w-full relative">
              <div className="relative pb-[56.25%] overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={`Slide ${index}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div
                className="absolute bottom-0 md:bottom-8 mb-1 left-2/4 transform -translate-x-1/2 w-full px-1 md:bg-transparent"
                ref={captionRef} // Attach the ref to the caption container
              >
                {item.caption.split('\n').map((line, i) => (
                  <span
                    key={i}
                    className="bg-zinc-950 p-1 text-orange-500 font-bold font-montserrat text-wrap uppercase text-xs md:text-sm lg:text-base"
                    style={{ display: 'inline', lineHeight: '1.7' }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 right-1 md:right-4 transform -translate-y-1/2 flex flex-col space-y-1 md:space-y-2 bg-zinc-900 bg-opacity-70 p-1 md:p-2 rounded">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`md:w-3 md:h-3 w-2 h-2 rounded-full bg-gray-50 hover:bg-gradient-to-r from-orange-600 to-orange-500 transition-colors duration-300 ${
              index === currentIndex ? 'bg-orange-600' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
