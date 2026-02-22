import React from "react";

export default function Splash({ onStart }) {
  const heroImage = "/favicon.png";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7e8] text-center p-6">
      <h1 className="text-5xl font-bold mb-4">DocBuddy</h1>
      <p className="text-lg mb-6">Understand before you sign.</p>

      <img
        src={heroImage}
        alt="DocBuddy art"
        className="max-w-md w-full mb-8 rounded-xl"
      />

      <button
        onClick={() => {
          console.log("✅ Get Started clicked");
          onStart();
        }}
        className="px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
      >
        Get Started
      </button>
    </div>
  );
}