import React from "react";

export default function IntroSplash({ onStart }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#f7f1e3", color: "#0f172a" }}
    >
      <img src="/favicon.png" alt="DocBuddy Logo" className="w-40 h-40 mb-8" />

      <h1 className="text-4xl font-semibold mb-8" style={{ color: "#0f172a" }}>
        DocBuddy
      </h1>

      <button
        onClick={onStart}
        className="btn-primary text-lg px-8 py-4"
      >
        Get Started
      </button>
    </div>
  );
}