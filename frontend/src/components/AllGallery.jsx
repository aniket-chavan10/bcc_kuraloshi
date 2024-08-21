import React, { useState, useEffect, useRef } from "react";
import { fetchGalleryData } from "../services/api";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../components/Loader"; // Import your custom Loader component

gsap.registerPlugin(ScrollTrigger);

const AllGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItemCount, setVisibleItemCount] = useState(8);
  const galleryRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGalleryData();
        const sortedGallery = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setGalleryData(sortedGallery);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Scroll to the top whenever the component is mounted or location changes
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (galleryData.length > 0) {
      gsap.fromTo(
        galleryRefs.current,
        {
          opacity: 0,
          y: 20, // Slight upward motion
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out", // Smooth easing
          stagger: 0.1,
          scrollTrigger: {
            trigger: galleryRefs.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [galleryData, visibleItemCount]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 8);
  };

  return (
    <div className="container mx-auto py-10 mt-3 md:mt-16 px-4 md:px-0">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <Loader /> {/* Use your custom Loader here */}
        </div>
      )}
      {error && <p>Error fetching gallery: {error.message}</p>}
      {galleryData.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryData.slice(0, visibleItemCount).map((item, index) => (
            <div
              key={index}
              ref={(el) => (galleryRefs.current[index] = el)}
              className="break-inside-avoid shadow-md overflow-hidden mb-4"
            >
              <img
                src={item.thumbnailImageUrl}
                alt={item.caption}
                className="w-full hover:scale-105 transition duration-500 ease-in-out"
              />
              <div className="py-2 pr-10 relative">
                <h3 className="text-sm font-bold mb-2">{item.caption}</h3>
                <Link
                  to={`/gallery/${item._id}`}
                  className="inline-block mt-2 text-sm font-bold text-zinc-800 hover:text-orange-600 cursor-pointer"
                >
                  View More
                </Link>
                <span className="absolute top-0 right-0 p-1 text-xs font-bold bg-orange-600 text-white">
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {galleryData.length > visibleItemCount && (
        <button
          onClick={handleLoadMore}
          className="bg-zinc-950 text-orange-600 font-bold py-1 px-4 rounded mt-4 mx-auto block"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default AllGallery;
