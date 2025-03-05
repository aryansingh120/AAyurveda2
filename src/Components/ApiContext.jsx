import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [imageData, setImageData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [allProductsData, setAllProductsData] = useState(null); // State for allProducts
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [imageResponse, videoResponse, allProductsResponse] = await Promise.all([
          axios.get('https://aayurveda-hn8w.onrender.com/home/receiveImg'),
          axios.get('https://aayurveda-hn8w.onrender.com/video/allVideos'),
          axios.get('https://aayurveda-hn8w.onrender.com/productData/allProducts') // Fetch allProducts data
        ]);

        setImageData(imageResponse.data);
        setVideoData(videoResponse.data);
        setAllProductsData(allProductsResponse.data); // Set allProducts data

        localStorage.setItem('imageDataCache', JSON.stringify(imageResponse.data));
        localStorage.setItem('videoDataCache', JSON.stringify(videoResponse.data));
        localStorage.setItem('allProductsCache', JSON.stringify(allProductsResponse.data)); // Cache allProducts data

        console.log('API Calls: Images, Videos, and All Products');
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const cachedImageData = localStorage.getItem('imageDataCache');
    const cachedVideoData = localStorage.getItem('videoDataCache');
    const cachedAllProductsData = localStorage.getItem('allProductsCache'); 

    if (cachedImageData && cachedVideoData && cachedAllProductsData) {
      setImageData(JSON.parse(cachedImageData));
      setVideoData(JSON.parse(cachedVideoData));
      setAllProductsData(JSON.parse(cachedAllProductsData)); 
      setIsLoading(false);
      console.log('Cache Data: Images, Videos, and All Products');
    } else {
      fetchData();
    }
  }, []);

  return (
    <ApiContext.Provider value={{ imageData, videoData, allProductsData, isLoading, error }}>
      {children}
    </ApiContext.Provider>
  );
};

// Hook to use API Data
const useApi = () => useContext(ApiContext);

export { ApiProvider, useApi };