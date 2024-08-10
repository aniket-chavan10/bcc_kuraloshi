import React, { useState, useEffect, useRef } from "react";
import { fetchGalleryData } from "../services/api";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItemCount, setVisibleItemCount] = useState(8); // Adjust as per your design
  const galleryItemRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGalleryData();
        // Ensure response is sorted by createdAt in descending order
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
    galleryItemRefs.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, [galleryData, visibleItemCount]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 8); // Increase by 8 items
  };

  return (
    <div className="container mx-auto py-10 mt-3 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      {isLoading && <p>Loading gallery...</p>}
      {error && <p>Error fetching gallery: {error.message}</p>}
      {galleryData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {galleryData.slice(0, visibleItemCount).map((item, index) => (
            <div
              key={index}
              ref={(el) => (galleryItemRefs.current[index] = el)}
              className="shadow-md overflow-hidden"
            >
              <div className="w-full h-64 bg-black">
                <img
                  src={item.thumbnailImageUrl}
                  alt={item.caption}
                  className="w-full h-64 object-cover hover:scale-110 transition duration-1000 ease-in-out"
                />
              </div>

              <div className="py-2 pr-10 relative">
                <h3 className="text-sm font-bold mb-2">{item.caption}</h3>
                <Link
                  to={`/gallery/${item._id}`}
                  className="inline-block mt-2 text-sm font-bold text-zinc-800 hover:text-orange-600 cursor-pointer"
                >
                  View More
                </Link>
                <span className="absolute top-0 right-0 p-1 text-xs font-bold bg-gradient-to-r from-orange-600 to-orange-500 text-white">
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

export default Gallery;
