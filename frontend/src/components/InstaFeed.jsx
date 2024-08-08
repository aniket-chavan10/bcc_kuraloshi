import React, { useEffect, useState } from "react";
import axios from "axios";

const InstaFeed = () => {
  const [posts, setPosts] = useState([]);
  const [accessToken, setAccessToken] = useState(
    "IGQWRNZAmxGUFU3aDhleHByRG1KNXZAtSDNDRDZAiR0RqNlFvUEtpUW9Bbzd5b0g5ZAHBxaGhocFN1ck5OZA0pwOUczWDlQT3N2NHNubHI0SVB1ZAWlWTHpjQ21yOWZAUZAkI4eWNTR0lMdWNna2g4dnRYNGdDRkdmOUNCLXMZD"
  );

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await axios.get(
          `https://graph.instagram.com/me/media`,
          {
            params: {
              fields: "id,caption,media_url,media_type,permalink",
              access_token: accessToken,
            },
          }
        );
        const imagePosts = response.data.data.filter(
          (post) => post.media_type === "IMAGE"
        );
        setPosts(imagePosts);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await axios.get(
          `https://graph.instagram.com/refresh_access_token`,
          {
            params: {
              grant_type: "ig_refresh_token",
              access_token: accessToken,
            },
          }
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    };

    fetchInstagramPosts();

    // Refresh the access token every 50 days to avoid expiration
    const refreshInterval = setInterval(() => {
      refreshAccessToken();
    }, 50 * 24 * 60 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [accessToken]);

  return (
    <div className="container mx-auto py-10">
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
