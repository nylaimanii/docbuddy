import React, { useState, useRef } from "react";

export default function UploadScreen({ onSubmit, error }) {
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => setText(event.target.result || "");
    reader.readAsText(file);
  }

  function handleImageUpload() {
    // Mock OCR result for demo
    setText("Mock OCR text from image. The rent is $1200. Late fee is $75 after 5 days.");
  }

  function handleLiveCamera() {
    // Mock camera scan for demo
    setText("Mock camera scan text. Lease is 12 months. Late fee is $75.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-blue-500 mb-2">DocBuddy</h1>
        <p className="text-slate-600 mb-4">Add your document to analyze:</p>

        <div className="flex gap-3 flex-wrap mb-4">
          <button
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-xl transition"
            onClick={handleLiveCamera}
          >
            Live Camera
          </button>

          <button
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-xl transition"
            onClick={() => imageInputRef.current.click()}
          >
            Photo Gallery
          </button>

          <button
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-xl transition"
            onClick={() => fileInputRef.current.click()}
          >
            Upload File
          </button>

          <button
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-xl transition"
            onClick={() => setText("")}
          >
            Paste Text
          </button>
        </div>

        <input
          type="file"
          accept=".txt"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
        />

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />

        <textarea
          rows={8}
          className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="Paste or load your document text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={() => onSubmit(text)}
          disabled={!text.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
        >
          Analyze
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}