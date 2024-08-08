import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsItemById } from "../services/api";

const NewsDetails = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNewsItemById(id);
        setNewsItem(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month} ${date.getFullYear()}`;
  };

  const formatDescription = (text) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-4">{line}</p>
    ));
  };

  if (isLoading) return <p className="text-center py-4 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-600">Error fetching news item: {error.message}</p>;

  return (
    <div className="container mx-auto py-10 mt-20 px-4 md:px-0">
      {newsItem && (
        <div>
          {/* Title and Date */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold mb-3 text-gray-900 leading-tight">{newsItem.title}</h1>
            <span className="text-base text-gray-600">{formatDate(newsItem.createdAt)}</span>
          </div>
          
          {/* Main Image */}
          <div className="relative w-full mb-8">
            <div className="relative w-full h-0 pb-[56.25%]">
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="absolute inset-0 w-full h-full object-cover shadow-md"
              />
            </div>
          </div>
          
          {/* Description */}
          <div className="text-gray-800">
            {formatDescription(newsItem.description)}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
