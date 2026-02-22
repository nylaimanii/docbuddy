import React from "react";

export default function LoadingPage() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "#f7f1e3", color: "#0f172a" }}
    >
      <div className="flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold mb-6">
          Analyzing your document, please wait a moment...
        </h2>

        <div className="flex space-x-3 text-4xl font-bold" style={{ color: "#2aa198" }}>
          <span className="animate-bounce">•</span>
          <span className="animate-bounce [animation-delay:0.15s]">•</span>
          <span className="animate-bounce [animation-delay:0.3s]">•</span>
        </div>
      </div>
    </div>
  );
}