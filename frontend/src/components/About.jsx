import React, { useEffect, useState } from 'react';
import { fetchLatestInfo } from "../services/api";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageWithLoader = ({ src, alt, onImageLoad }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
    onImageLoad(); // Trigger the GSAP animation once the image is loaded
  };

  return (
    <div className="relative w-full h-auto">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: loading ? 'none' : 'block' }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const About = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await fetchLatestInfo();
        setInfo(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getInfo();
  }, []);

  useEffect(() => {
    if (imageLoaded && !loading && !error) {
      gsap.from(".about-heading", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
        },
      });

      gsap.from(".about-text", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
        },
      });

      gsap.from(".about-image", {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 85%",
        },
      });
    }
  }, [imageLoaded, loading, error]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10 mt-3 px-4 md:px-0">
      <div className="mb-10 about-image">
        <div className="relative">
          <ImageWithLoader
            src={info.teamImg}
            alt="Bhairavnath Cricket Club"
            onImageLoad={handleImageLoad}
          />
        </div>
      </div>
      {imageLoaded && (
        <div className="text-gray-800 space-y-12">
          <div>
            <h2 className="text-4xl font-bold mb-6 about-heading">
              About {info.clubName}
            </h2>
            <p className="mb-6 text-lg about-text">{info.description}</p>
            <p className="mb-6 text-lg italic about-text">{info.tagline}</p>
            <div className="flex flex-col md:flex-row md:space-x-4 text-lg about-text">
              <p>Email: <span className="font-semibold">{info.email}</span></p>
              <p>Contact Number: <span className="font-semibold">{info.contactNumber}</span></p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6 about-heading">
              About Jaoli Cricket Association
            </h2>
            <p className="mb-6 text-lg about-text">
              The Jaoli Cricket Association provides a platform for teams like ours. 
              They organize matches in Mumbai and villages to provide opportunities for players and cricket enthusiasts 
              who are located in Mumbai for work purposes and those in villages.
            </p>
            <p className="mb-6 text-lg about-text">
              The association plays a crucial role in the development of cricket in our region. 
              By hosting tournaments and training camps, they ensure that players have the resources and support needed to excel in the sport.
              Their efforts have led to the discovery of many talented cricketers who have gone on to represent higher leagues and teams.
            </p>
            <p className="text-lg about-text">
              Additionally, the Jaoli Cricket Association fosters a sense of community among cricket lovers. 
              They bring together players, coaches, and fans, creating a vibrant and supportive cricketing environment.
              Their initiatives not only promote physical fitness but also encourage a love for the game among the youth.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
