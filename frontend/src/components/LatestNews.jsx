import React, { useState, useEffect, useRef } from "react";
import { fetchNewsData } from "../services/api";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleNewsCount, setVisibleNewsCount] = useState(7);

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
      gsap.fromTo(
        newsContainerRef.current.querySelectorAll(".news-item"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsContainerRef.current,
            start: "top 80%",
            end: "bottom 100%",
            scrub: 1,
            toggleActions: "play none none reset",
          },
          onComplete: () => setIsLoading(false), // Set isLoading to false after animation completes
        }
      );
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

  const ImageWithLoader = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);

    return (
      <div className="relative w-full h-80">
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoading(false)}
          style={{ display: loading ? "none" : "block" }}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="spinner-border animate-spin w-8 h-8 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
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
          <div className="md:col-span-2 shadow-md overflow-hidden news-item">
            <ImageWithLoader
              src={newsData[0].imageUrl} // Direct URL to the image
              alt={newsData[0].title}
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
          {newsData.slice(1, visibleNewsCount).map((newsItem) => (
            <div
              key={newsItem._id}
              className="shadow-md overflow-hidden md:col-span-1 col-span-full flex flex-col news-item"
            >
              <ImageWithLoader
                src={newsItem.imageUrl} // Direct URL to the image
                alt={newsItem.title}
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
