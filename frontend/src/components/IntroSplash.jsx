import React, { forwardRef } from "react";

const IntroSplash = forwardRef((props, ref) => {
  return (
    <video
      ref={ref}
      src="/splash1.mp4"
      autoPlay
      muted
      playsInline
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
});

export default IntroSplash;