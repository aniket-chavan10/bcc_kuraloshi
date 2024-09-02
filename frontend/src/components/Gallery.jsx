import React, { useState, useEffect, useRef, useContext } from "react";
import { fetchGalleryData } from "../services/api";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../components/Loader";
import AppContext from "../context/AppContext"; // Import your AppContext

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const { galleryData, setGalleryData } = useContext(AppContext); // Use context values
  const [isLoading, setIsLoading] = useState(!galleryData.length); // Set loading state based on context
  const [error, setError] = useState(null);
  const [visibleItemCount, setVisibleItemCount] = useState(8);
  const galleryItemRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGalleryData();
        const sortedGallery = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setGalleryData(sortedGallery); // Update context with fetched data
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!galleryData.length) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [galleryData, setGalleryData]);

  useEffect(() => {
    galleryItemRefs.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
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
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 8);
  };

  const ImageWithLoader = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);

    return (
      <div className="relative w-full h-64">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader /> {/* Show Loader while loading */}
          </div>
        )}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoading(false)}
          style={{ display: loading ? "none" : "block" }}
          className="w-full h-64 object-cover hover:scale-110 transition duration-1000 ease-in-out"
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10 mt-3 px-4 md:px-0">
      {/* Conditionally render the title based on loading state */}
      {!isLoading && <h2 className="text-2xl font-bold mb-4">Gallery</h2>}
      
      {error && <p>Error fetching gallery: {error.message}</p>}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        galleryData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {galleryData.slice(0, visibleItemCount).map((item, index) => (
              <div
                key={index}
                ref={(el) => (galleryItemRefs.current[index] = el)}
                className="shadow-md overflow-hidden"
              >
                <ImageWithLoader
                  src={item.thumbnailImageUrl}
                  alt={item.caption}
                />
                <div className="py-2 pr-10 relative">
                  <h3 className="text-sm font-bold mb-2">{item.caption}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <Link
                      to={`/gallery/${item._id}`}
                      className="inline-block mt-2 text-sm font-bold text-zinc-800 hover:text-orange-600 cursor-pointer"
                    >
                      View More
                    </Link>
                    <span className="text-sm font-bold text-black px-2 py-1">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
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
