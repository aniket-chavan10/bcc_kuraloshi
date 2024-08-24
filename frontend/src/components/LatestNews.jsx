import React, { useState, useEffect, useRef } from "react";
import { fetchNewsData } from "../services/api";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Loader from '../components/Loader';

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleNewsCount, setVisibleNewsCount] = useState(7);
  const [loadingImages, setLoadingImages] = useState({});

  const newsContainerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fetchData = async () => {
      try {
        const response = await fetchNewsData();
        const sortedNews = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewsData(sortedNews);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (newsData.length > 0) {
      newsData.forEach((_, index) => {
        const newsItemRef = newsContainerRef.current.querySelector(
          `.news-item-${index}`
        );

        gsap.fromTo(
          newsItemRef,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: newsItemRef,
              start: "top 100%",
              end: "bottom 20%",
              toggleActions: "play none none reset",
              markers: false, // Set to true for debugging
            },
          }
        );
      });
    }
  }, [newsData, visibleNewsCount]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  const handleLoadMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 3);
  };

  const handleImageLoad = (index) => {
    setTimeout(() => {
      setLoadingImages((prevState) => ({
        ...prevState,
        [index]: false,
      }));
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 mt-3 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      {error && <p>Error fetching news: {error.message}</p>}
      {newsData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" ref={newsContainerRef}>
          {/* Large news item */}
          <div className="md:col-span-2 shadow-md overflow-hidden news-item news-item-0 relative">
            {loadingImages[0] !== false && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
              </div>
            )}
            <img
              src={newsData[0].imageUrl}
              alt={newsData[0].title}
              onLoad={() => handleImageLoad(0)}
              className="w-full h-80 object-cover"
              style={{ display: loadingImages[0] !== false ? "none" : "block" }}
            />
            <div className="py-2 relative">
              <h3 className="text-lg font-bold mb-2">{newsData[0].title}</h3>
              <p className="text-gray-700 truncate overflow-hidden">{newsData[0].description}</p>
              <div className="flex justify-between items-center mt-2">
                <Link
                  to={`/news/${newsData[0]._id}`}
                  className="text-sm font-bold text-black hover:text-orange-600 cursor-pointer"
                >
                  Read More
                </Link>
                <span className="text-sm font-bold text-black px-2 py-1">
                  {formatDate(newsData[0].createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Smaller news items */}
          {newsData.slice(1, visibleNewsCount).map((newsItem, index) => (
            <div
              key={newsItem._id}
              className={`shadow-md overflow-hidden md:col-span-1 col-span-full flex flex-col news-item news-item-${index + 1} relative`}
            >
              {loadingImages[index + 1] !== false && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader />
                </div>
              )}
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                onLoad={() => handleImageLoad(index + 1)}
                className="w-full h-80 object-cover"
                style={{ display: loadingImages[index + 1] !== false ? "none" : "block" }}
              />
              <div className="py-2 relative flex flex-col">
                <h3 className="text-sm font-bold mb-2">{newsItem.title}</h3>
                <p className="text-gray-700 truncate overflow-hidden text-xs">{newsItem.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <Link
                    to={`/news/${newsItem._id}`}
                    className="text-sm font-bold text-black hover:text-orange-600 cursor-pointer"
                  >
                    Read More
                  </Link>
                  <span className="text-sm font-bold text-black px-2 py-1">
                    {formatDate(newsItem.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {newsData.length > visibleNewsCount && (
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

export default LatestNews;
