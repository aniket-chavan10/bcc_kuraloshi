import React, { useEffect, useState } from "react";
import axios from "axios";

const InstaFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // Call your backend API to fetch Instagram posts
        const response = await axios.get(
          "https://bcc-backend-nue7.onrender.com/api/instafeed"
        );
        const imagePosts = response.data.data.filter(
          (post) => post.media_type === "IMAGE"
        );
        setPosts(imagePosts);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Instagram Posts</h2>
      <div className="container mx-auto py-10 p-10 md:p-16 bg-custom-gradient">
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pr-5">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden block shadow-lg"
              >
                <div className="bg-white p-1">
                  <img
                    src={post.media_url}
                    alt={post.caption}
                    className="w-full h-auto object-cover transition-transform duration-1000 ease-in-out transform hover:scale-110"
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
