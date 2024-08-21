import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNewsItemById } from "../services/api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (newsItem) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 1.5 }
      )
        .fromTo(
          imageRef.current,
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, duration: 1.5 },
          "-=1" // Overlapping animation
        )
        .fromTo(
          descriptionRef.current.children,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
          },
          "-=1.2" // Overlapping animation
        );
    }
  }, [newsItem]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month} ${date.getFullYear()}`;
  };

  const formatDescription = (text) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-4">
        {line}
      </p>
    ));
  };

  if (isLoading)
    return <p className="text-center py-4 text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-4 text-red-600">
        Error fetching news item: {error.message}
      </p>
    );

  return (
    <div className="container mx-auto py-0 md:py-8 mt-20 px-4 md:px-0">
      <button
        onClick={handleGoBack}
        className="flex items-center text-orange-600 hover:text-orange-800 mb-4"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Go Back
      </button>

      {newsItem && (
        <div>
          <div className="mb-8" ref={titleRef}>
            <h1 className="text-4xl font-extrabold mb-3 text-gray-900 leading-tight">
              {newsItem.title}
            </h1>
            <span className="text-base text-gray-600">
              {formatDate(newsItem.createdAt)}
            </span>
          </div>

          <div className="relative w-full mb-8" ref={imageRef}>
            <div className="relative w-full h-0 pb-[56.25%]">
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="absolute inset-0 w-full h-full object-cover shadow-md rounded-md"
              />
            </div>
          </div>

          <div className="text-gray-800 leading-relaxed" ref={descriptionRef}>
            {formatDescription(newsItem.description)}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
