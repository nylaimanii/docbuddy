import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-[800px]">

        <h1 className="text-3xl font-semibold text-center mb-10">
          Home Page
        </h1>

        <div className="grid grid-cols-2 gap-8">

          <button className="bg-blue-100 hover:bg-blue-200 transition p-8 rounded-xl text-lg font-medium">
            Paste Text
          </button>

          <button className="bg-green-100 hover:bg-green-200 transition p-8 rounded-xl text-lg font-medium">
            Upload File
          </button>

          <button className="bg-purple-100 hover:bg-purple-200 transition p-8 rounded-xl text-lg font-medium">
            Live Camera
          </button>

          <button className="bg-pink-100 hover:bg-pink-200 transition p-8 rounded-xl text-lg font-medium">
            Photo Gallery
          </button>

        </div>
      </div>

    </div>
  );
}