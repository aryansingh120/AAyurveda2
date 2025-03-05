import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./comman.css";
import { useApi } from "./ApiContext";

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const scrollContainerRef = useRef(null);
  const { videoData } = useApi();
  

  useEffect(() => {
    if (videoData?.videos?.length) {
      const x = videoData?.videos?.map((item) => item.url);
      setVideos([...x, ...x]); // Duplicate for infinite loop
    }
  }, [videoData]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let speed = 1.5; // Adjust scrolling speed
    let animationFrame;

    const smoothScroll = () => {
      scrollContainer.scrollLeft += speed;

      // Jab last video complete ho jaye toh ekdam smoothly first video se start ho jaye
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(smoothScroll);
    };

    animationFrame = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [videos]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Scrolling Video Container */}
      <div
        ref={scrollContainerRef}
        className="flex py-4 w-full hide overflow-hidden"
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {videos?.map((video, index) => (
          <div key={index} className="flex-none w-[150px] h-[260px]">
            <video
              className="w-full h-full rounded-3xl cursor-pointer transition-transform duration-300 hover:scale-105"
              src={video}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              onClick={() => setSelectedVideo(video)}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <button
                className="absolute -top-10 -right-10 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700"
                onClick={() => setSelectedVideo(null)}
              >
                <X size={30} />
              </button>
              <video
                src={selectedVideo}
                autoPlay
                controls
                className="w-[90vw] h-[80vh] rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
