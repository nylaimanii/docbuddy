import React from "react";

export default function Processing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">
          Scanning your document...
        </h1>
        <p className="text-slate-600">
          Hang tight, this will only take a moment.
        </p>
      </div>
    </div>
  );
}