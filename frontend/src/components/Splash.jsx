import React from "react";

export default function Splash({ onContinue }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7e8] text-center p-6">
      <h1 className="text-5xl font-bold mb-4">DocBuddy</h1>
      <p className="text-lg text-slate-600 mb-8">
        Understand before you sign.
      </p>

      {/* Opening Art from public folder */}
      <img
        src="/favicon.png"
        alt="DocBuddy opening art"
        className="max-w-xs md:max-w-md mb-8 rounded-xl shadow"
      />

      <button
        onClick={onContinue}
        className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg font-semibold transition"
      >
        Get Started
      </button>
    </div>
  );
}