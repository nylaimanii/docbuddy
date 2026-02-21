import React from "react";

export default function Processing() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card text-center">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          Scanning your document...
        </h2>
        <p className="text-slate-600">Hang tight, this will only take a moment.</p>
      </div>
    </div>
  );
}