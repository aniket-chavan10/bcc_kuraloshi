import React, { useState, useEffect, useRef, useContext } from "react";
import { fetchCarouselItems } from "../services/api";
import gsap from "gsap";
import Loader from "../components/Loader";
import AppContext from "../context/AppContext"; // Import the context

const Carousel = () => {
  const { carouselItems, setCarouselItems } = useContext(AppContext); // Use context
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(!carouselItems.length); // Set initial loading based on context
  const [error, setError] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);
  const captionRef = useRef(null);

  useEffect(() => {
    const getCarouselItems = async () => {
      if (carouselItems.length === 0) { // Only fetch if there are no items in context
        try {
          const MINIMUM_LOADING_TIME = 3000; // Minimum skeleton display time (3 seconds)
          const start = Date.now();

          const data = await fetchCarouselItems();
          setCarouselItems(data.slice(-4)); // Load the last 4 items

          const elapsed = Date.now() - start;
          const remainingTime = MINIMUM_LOADING_TIME - elapsed;

          if (remainingTime > 0) {
            await new Promise((resolve) => setTimeout(resolve, remainingTime));
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false); // Set loading to false after the minimum time has passed
        }
      } else {
        setIsLoading(false); // If items are already in context, skip loading
      }
    };

    getCarouselItems();
  }, [carouselItems.length, setCarouselItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  useEffect(() => {
    if (captionRef.current) {
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleImageLoad = () => {
    setLoadingImages(false);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[300px] max-w-full mx-auto overflow-hidden bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
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
                {loadingImages && currentIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <Loader />
                  </div>
                )}
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={`Slide ${index}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loadingImages ? "opacity-0" : "opacity-100"}`}
                    onLoad={() => {
                      handleImageLoad();
                      if (currentIndex === index) {
                        gsap.fromTo(
                          captionRef.current,
                          { opacity: 0, y: 50 },
                          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
                        );
                      }
                    }}
                    onError={handleImageLoad} // Handle image load error case
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div
                className="absolute bottom-0 md:bottom-8 mb-1 left-2/4 transform -translate-x-1/2 w-full px-1 md:bg-transparent"
                ref={captionRef}
              >
                {item.caption.split("\n").map((line, i) => (
                  <span
                    key={i}
                    className="bg-zinc-950 p-1 text-orange-500 font-bold font-montserrat text-wrap uppercase text-xs md:text-sm lg:text-base"
                    style={{ display: "inline", lineHeight: "1.7" }}
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
              index === currentIndex ? "bg-orange-600" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
