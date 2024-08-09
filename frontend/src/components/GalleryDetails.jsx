import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGalleryItemById } from "../services/api";

const GalleryDetail = () => {
  const { id } = useParams();
  const [galleryItem, setGalleryItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container mx-auto py-10 mt-20 mb-10 max-w-8xl">
      {/* Small Images Grid including Thumbnail */}
      {allImages.length > 0 && (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {allImages.map((url, index) => (
            <div key={index} className="relative w-full h-0 pb-[56.25%]">
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
          <div className="w-full mb-10">
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
            {[...imageUrls, ...additionalImageUrls].map((url, index) => (
              <div key={index} className="relative w-full h-0 pb-[56.25%]">
                <img
                  src={url}
                  alt={`Additional image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail;
