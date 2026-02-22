import React from "react";

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">

      {/* 🌿 FULLSCREEN GIF BACKGROUND */}
      <img
        src="/totoro.gif"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Optional soft overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* 🌟 GLASS CONTAINER WRAPPER */}
      <div className="relative z-10 flex items-center justify-center h-full">

        {/* 🌟 GLASS BOX */}
        <div
          className="
            relative
            w-[750px]
            p-14
            pt-20
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            border border-white/30
            shadow-2xl
          "
        >

          {/* 🧩 FAVICON OVERLAY */}
          <img
            src="/favicon.png"
            alt="icon"
            className="
              absolute
              -top-10
              -left-10
              w-32
              h-32
              rounded-full
              object-cover
              border border-white/40
              shadow-md
            "
          />

          {/* 🏷 FLOATING TITLE */}
          <h1
            className="
              absolute
              -top-8
              left-1/2
              -translate-x-1/2
              text-8xl
              font-bold
              text-grey
            "
            style={{ fontFamily: "Strongmark" }}
          >
            Doc Buddy
          </h1>

          {/* 🔘 BUTTON GRID */}
          <div className="grid grid-cols-2 gap-10">
            {["Paste Text", "Upload File", "Live Camera", "Photo Gallery"].map((text) => (
              <button
                key={text}
                className="
                  text-2xl
                  py-10
                  rounded-2xl
                  border border-white/40
                  bg-white/5
                  backdrop-blur-md
                  text-white
                  hover:bg-white/20
                  transition
                  duration-300
                "
                style={{ fontFamily: "Corn" }}
              >
                {text}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}