import React from "react";

export default function IntroSplash({ onStart }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600 px-6">
      {/* Center Logo */}
      <img
        src="/favicon.png"
        alt="DocBuddy Logo"
        className="w-40 h-40 mb-8"
      />

      {/* App Name */}
      <h1 className="text-4xl font-semibold mb-8 text-gray-800">
        DocBuddy
      </h1>

      {/* Get Started Button */}
      <button
        onClick={onStart}
        className="btn-primary text-lg px-8 py-4"
      >
        Get Started
      </button>
    </div>
  );
}