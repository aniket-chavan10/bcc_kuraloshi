import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { getContactFormSubmissions } from "../services/api";

const formatDate = (date) => {
  const options = { day: '2-digit', month: 'short' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const MessagesView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getContactFormSubmissions();
        setMessages(fetchedMessages);
        setLoading(false);
        if (fetchedMessages.length <= visibleCount) {
          setAllLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();

    gsap.fromTo(
      ".messages-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      ".message-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.2,
      }
    );
  }, [visibleCount]);

  const handleLoadMore = () => {
    if (visibleCount + 5 >= messages.length) {
      setAllLoaded(true);
    }
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="container mx-auto md:mt-24 mt-16 mb-10 p-8 bg-white max-w-xl shadow-lg rounded-lg messages-container">
      <h1 className="text-4xl font-bold text-orange-600 text-center mb-4">
        View Messages
      </h1>
      <h2 className="text-gray-600 text-center mb-6">
        See all the messages submitted through the contact form
      </h2>

      {loading ? (
        <div className="text-center">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500">No messages found</div>
      ) : (
        <>
          <ul className="space-y-4">
            {messages.slice(0, visibleCount).map((message) => (
              <li
                key={message._id}
                className="p-6 bg-gray-100 rounded-lg shadow-md message-item transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-100"
              >
                <h3 className="text-lg font-semibold text-orange-600">
                  {message.name}
                </h3>
                <p className="text-gray-700">
                  <strong>Mobile:</strong> {message.mobile}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {message.email}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Message:</strong> {message.message}
                </p>
                <p className="text-gray-500 text-sm mt-4">
                  Submitted on: {formatDate(message.submittedAt)}
                </p>
              </li>
            ))}
          </ul>
          {!allLoaded && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="py-2 px-6 rounded-full bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition-colors duration-300 ease-in-out"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessagesView;
