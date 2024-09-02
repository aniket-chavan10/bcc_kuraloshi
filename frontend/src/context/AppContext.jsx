import React, { createContext, useState, useEffect } from "react";
import { fetchLatestInfo, fetchNewsData, fetchPlayersData } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [clubInfo, setClubInfo] = useState(null);
  const [newsTitles, setNewsTitles] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [playersData, setPlayersData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubResponse = await fetchLatestInfo();
        if (clubResponse) setClubInfo(clubResponse);

        const newsResponse = await fetchNewsData();
        if (Array.isArray(newsResponse)) {
          const titles = newsResponse.map((news) => ({
            id: news._id,
            title: news.title,
          }));
          setNewsTitles(titles);
          setNewsData(newsResponse);
        }

        const playersResponse = await fetchPlayersData();
        if (Array.isArray(playersResponse)) {
          setPlayersData(playersResponse);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        clubInfo,
        setClubInfo,
        newsTitles,
        setNewsTitles,
        newsData,
        setNewsData,
        carouselItems,
        setCarouselItems,
        fixtures,
        setFixtures,
        playersData,
        setPlayersData,
        galleryData,
        setGalleryData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
