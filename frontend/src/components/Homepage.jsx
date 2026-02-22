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
        <div className="
          relative
          w-[750px]
          p-14
          rounded-3xl
          bg-white/10
          backdrop-blur-xl
          border border-white/30
          shadow-2xl
        ">

          {/* 🧩 FAVICON OVERLAY */}
          <img
            src="/favicon.png"
            alt="icon"
            className="
              absolute
              -top-10
              -left-6
              w-30
              h-40
              object-contain
              rounded-full
              p-2
              shadow-lg
            "
          />

          {/* 🔤 HEADING */}
         <h1
  className="text-7xl ml-32"
  style={{ fontFamily: "Strongmark" }}
>
  DocBuddy
</h1>

          {/* 🔘 BUTTON GRID */}
          <div className="grid grid-cols-2 gap-10">
            {["Paste Text", "Upload File", "Live Camera", "Photo Gallery"].map((text) => (
              <button
                key={text}
                className="
                  font-yeseva
                  text-lg
                  py-10
                  rounded-2xl
                  border border-white/40
                  bg-white/5
                  backdrop-blur-md
                  text-black
                  hover:bg-white/20
                  transition
                  duration-300
                "
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