import React, { useState, useEffect, useRef, useContext } from "react";
import { fetchNewsData } from "../services/api";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Loader from "../components/Loader";
import AppContext from "../context/AppContext"; // Import context

const LatestNews = () => {
  const { newsData, setNewsData } = useContext(AppContext); // Use context for news data
  const [isLoading, setIsLoading] = useState(!newsData.length);
  const [error, setError] = useState(null);
  const [visibleNewsCount, setVisibleNewsCount] = useState(7);
  const [loadingImages, setLoadingImages] = useState({});

  const newsContainerRef = useRef(null);

  useEffect(() => {
    if (!newsData.length) {
      const fetchData = async () => {
        try {
          const response = await fetchNewsData();
          const sortedNews = response.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setNewsData(sortedNews); // Store data in context
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [newsData, setNewsData]);

  useEffect(() => {
    if (newsData.length > 0) {
      const newsItems = newsContainerRef.current.querySelectorAll(".news-item");
      
      gsap.fromTo(
        newsItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: newsContainerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      );
    }
  }, [newsData]);

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
    setLoadingImages((prevState) => ({
      ...prevState,
      [index]: false,
    }));
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
          <div className="md:col-span-2 shadow-md overflow-hidden news-item relative">
            {loadingImages[0] !== false && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
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
            <div className="py-2 relative z-0">
              <h3 className="text-lg font-bold mb-2">{newsData[0].title}</h3>
              <p className="text-gray-700 truncate overflow-hidden">
                {newsData[0].description}
              </p>
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

          {newsData.slice(1, visibleNewsCount).map((newsItem, index) => (
            <div
              key={newsItem._id}
              className="shadow-md overflow-hidden md:col-span-1 col-span-full flex flex-col news-item relative"
            >
              {loadingImages[index + 1] !== false && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
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
              <div className="py-2 relative z-0 flex flex-col">
                <h3 className="text-sm font-bold mb-2">{newsItem.title}</h3>
                <p className="text-gray-700 truncate overflow-hidden text-xs">
                  {newsItem.description}
                </p>
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
