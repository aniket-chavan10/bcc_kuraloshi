import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGalleryItemById } from "../services/api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

gsap.registerPlugin(ScrollTrigger);

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [galleryItem, setGalleryItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGalleryItemById(id);
        console.log("Gallery item response:", response); // Debug log
        setGalleryItem(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Scroll to the top whenever the component is mounted or location changes
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (galleryItem) {
      gsap.fromTo(
        imageRefs.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRefs.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [galleryItem]);

  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching gallery item: {error.message}</p>;

  const imageUrls = galleryItem?.imageUrls || [];
  const additionalImageUrls = galleryItem?.additionalImageUrls || [];
  const allImages = [
    galleryItem.thumbnailImageUrl,
    ...imageUrls,
    ...additionalImageUrls,
  ].filter(Boolean); // Combine and filter out any null/undefined values

  return (
    <div className="container mx-auto py-10 md:mt-20 mt-10 mb-10 max-w-8xl">
      {/* Go Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center text-orange-600 hover:text-orange-800 mb-4"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Go Back
      </button>

      {/* Small Images Grid including Thumbnail */}
      {allImages.length > 0 && (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {allImages.map((url, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="relative w-full h-0 pb-[56.25%]"
            >
              <img
                src={url}
                alt={`Additional image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      {/* Photos Label */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Photos</h2>
      </div>

      {/* Main Content */}
      {galleryItem && (
        <div className="bg-white shadow-lg">
          {/* Main Thumbnail Image */}
          <div
            className="w-full mb-10"
            ref={(el) =>
              (imageRefs.current[allImages.length] = el)
            }
          >
            <div className="relative w-full h-0 pb-[56.25%]">
              <img
                src={galleryItem.thumbnailImageUrl}
                alt={galleryItem.caption}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Large Additional Images */}
          <div className="w-full grid grid-cols-1 gap-16">
            {[...imageUrls, ...additionalImageUrls].map(
              (url, index) => (
                <div
                  key={index}
                  ref={(el) =>
                    (imageRefs.current[allImages.length + 1 + index] = el)
                  }
                  className="relative w-full h-0 pb-[56.25%]"
                >
                  <img
                    src={url}
                    alt={`Additional image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail;
