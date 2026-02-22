import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import IntroSplash from "./components/IntroSplash";
import HomePage from "./components/HomePage";

export default function App() {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    const updateProgress = () => {
      const percent = Math.min(video.currentTime / 3, 1);
      setProgress(percent);
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
  <div className="relative h-screen overflow-hidden">

    {/* HOME PAGE (fade in) */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: progress }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <HomePage />
    </motion.div>

    {/* SPLASH (fade out only) */}
    <motion.div
      className="absolute inset-0 z-10"
      animate={{ opacity: 1 - progress }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <IntroSplash ref={videoRef} />
    </motion.div>

  </div>
);
}