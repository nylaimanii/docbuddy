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
      if (!video.duration) return;

      // progress from 0 → 1
     const percent = Math.min(video.currentTime / 3, 1);
setProgress(percent);
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

      {/* Homepage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
        }}
      >
        HOME PAGE HERE
      </div>

      {/* Splash */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          overflow: "hidden",
          width: `${100 - progress * 100}%`,
        }}
      >
        <IntroSplash ref={videoRef} />
      </motion.div>

    </div>
  );
}