import React, { useEffect, useState, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from '../components/Loader'; 
import AppContext from '../context/AppContext'; // Adjust the path as necessary

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { clubInfo, setClubInfo } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      if (!clubInfo) { // Only fetch data if it's not already available
        try {
          const data = await fetchLatestInfo();
          setClubInfo(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getInfo();
  }, [clubInfo, setClubInfo]);

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
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
        },
      });

      gsap.from(".about-image", {
        opacity: 0,
        scale: 0.9,
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
      <div className="flex items-center justify-center h-screen">
        <Loader /> 
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600 font-semibold">Error: {error.message}</div>;
  }

  return (
    <div className="container md:mt-16 mt-5 mx-auto px-2 py-10 md:px-8 lg:px-0">
      <div className="mb-12 text-center">
        <div className="relative mb-6">
          <img
            src={clubInfo.teamImg}
            alt={`${clubInfo.clubName} Image`}
            onLoad={handleImageLoad}
            className="w-full h-auto object-cover shadow-xl about-image"
          />
        </div>
        {imageLoaded && (
          <div className="text-gray-900 space-y-6 md:space-y-10">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 about-heading capitalize">
              About {clubInfo.clubName}
            </h2>
            <p className="text-lg md:text-xl text-left leading-relaxed about-text text-gray-700">
              {clubInfo.description}
            </p>
            <p className="text-lg md:text-xl italic about-text text-gray-600">
              {clubInfo.tagline}
            </p>
            <div className="flex flex-col text-left md:space-x-8 text-lg md:text-xl about-text text-gray-800">
              <p>Email: <span className="font-semibold">{clubInfo.email}</span></p>
              <p>Contact Number: <span className="font-semibold">{clubInfo.contactNumber}</span></p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center about-heading">
          About Jaoli Cricket Association
        </h2>
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700 about-text">
          <p>
            The Jaoli Cricket Association provides a platform for teams like ours.
            They organize matches in Mumbai and surrounding villages, creating
            opportunities for players and enthusiasts located in both urban and rural areas.
          </p>
          <p>
            The association plays a crucial role in the development of cricket in our region.
            By hosting tournaments and training camps, they ensure that players have the resources
            and support needed to excel in the sport. Their efforts have led to the discovery
            of many talented cricketers who have gone on to represent higher leagues and teams.
          </p>
          <p>
            Additionally, the Jaoli Cricket Association fosters a sense of community among cricket lovers.
            They bring together players, coaches, and fans, creating a vibrant and supportive cricketing environment.
            Their initiatives not only promote physical fitness but also encourage a love for the game among the youth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
