import React, { useEffect, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Loader from "../components/Loader";

gsap.registerPlugin(ScrollTrigger);

const InstaFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await axios.get(
          "https://bcc-backend-nue7.onrender.com/api/instafeed"
        );
        const imagePosts = response.data.data.filter(
          (post) => post.media_type === "IMAGE"
        );
        setPosts(imagePosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        setError("Failed to load posts");
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      gsap.fromTo(
        ".insta-feed-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".insta-feed-item",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [posts]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 mt-3 md:px-0">
      <h2 className="text-2xl font-bold mb-4 px-4">Instagram Posts</h2>
      <div className="container mx-auto py-10 p-5 md:p-16 bg-custom-gradient relative">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
            <Loader />
          </div>
        )}
        <div className={`h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 ${loading ? 'opacity-50' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pr-5">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="insta-feed-item overflow-hidden block shadow-lg"
              >
                <div className="bg-white p-1">
                  <img
                    src={post.media_url}
                    alt={post.caption}
                    className="w-full h-auto object-cover transition-transform duration-1000 ease-in-out transform "
                  />
                  <div className="p-4">
                    <p className="text-gray-700 font-semibold text-sm truncate leading-tight">
                      {post.caption}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstaFeed;
