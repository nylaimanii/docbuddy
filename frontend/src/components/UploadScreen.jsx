import React, { useRef, useState } from "react";

export default function UploadScreen({ onSubmit, error }) {
  const [mode, setMode] = useState(null); // null | "text"
  const [text, setText] = useState("");

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  function handleAnalyze() {
    if (!text.trim()) return;
    onSubmit(text);
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target.result || "");
      setMode("text");
    };
    reader.readAsText(file);
  }

  function handleImageUpload() {
    setText("Mock OCR text from image. Rent is $1200. Late fee is $75 after 5 days.");
    setMode("text");
  }

  function handleLiveCamera() {
    setText("Mock camera scan text. Lease is 12 months. Late fee is $75.");
    setMode("text");
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#fff7e8] p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-2">DocBuddy</h1>
        <p className="text-slate-600 mb-6">Understand before you sign</p>

        <h2 className="text-lg font-semibold mb-3">Add your document to analyze:</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={handleLiveCamera} className="px-4 py-2 rounded-xl border bg-white">
            Live Camera
          </button>
          <button onClick={() => imageInputRef.current.click()} className="px-4 py-2 rounded-xl border bg-white">
            Photo Gallery
          </button>
          <button onClick={() => fileInputRef.current.click()} className="px-4 py-2 rounded-xl border bg-white">
            Upload File
          </button>
          <button onClick={() => setMode("text")} className="px-4 py-2 rounded-xl border bg-white">
            Paste Text
          </button>
        </div>

        <input type="file" accept=".txt" ref={fileInputRef} hidden onChange={handleFileUpload} />
        <input type="file" accept="image/*" ref={imageInputRef} hidden onChange={handleImageUpload} />

        {mode === "text" && (
          <textarea
            className="w-full h-48 p-4 border-2 border-orange-400 rounded-xl bg-[#fff7e8]"
            placeholder="Paste or load your document text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}

        {error && <p className="text-red-600 mt-2">{error}</p>}

        {mode === "text" && (
          <button
            onClick={handleAnalyze}
            className="mt-4 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold"
          >
            Analyze
          </button>
        )}
      </div>
    </div>
  );
}