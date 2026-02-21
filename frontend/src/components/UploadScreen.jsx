import React, { useRef, useState } from "react";

export default function UploadScreen({ onSubmit, error }) {
  const [mode, setMode] = useState(null); // null | "text"
  const [text, setText] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // TODO: real OCR later
    setText("Mock OCR text from image. Rent is $1200. Late fee is $75 after 5 days.");
    setMode("text");
  }

  async function handleLiveCamera() {
    setShowCamera(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }

  function takePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const stream = video.srcObject;
    stream.getTracks().forEach((t) => t.stop());

    setShowCamera(false);

    // TODO: real OCR later
    setText("Mock camera scan text. Lease is 12 months. Late fee is $75.");
    setMode("text");
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-[#fff7e8] p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-2">DocBuddy</h1>
        <p className="text-slate-600 mb-6">Understand before you sign</p>

        <h2 className="text-lg font-semibold mb-3">Add your document to analyze:</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={handleLiveCamera} className="px-4 py-2 rounded-xl border bg-white hover:bg-slate-100">
            Live Camera
          </button>

          <button onClick={() => imageInputRef.current.click()} className="px-4 py-2 rounded-xl border bg-white hover:bg-slate-100">
            Photo Gallery
          </button>

          <button onClick={() => fileInputRef.current.click()} className="px-4 py-2 rounded-xl border bg-white hover:bg-slate-100">
            Upload File
          </button>

          <button onClick={() => setMode("text")} className="px-4 py-2 rounded-xl border bg-white hover:bg-slate-100">
            Paste Text
          </button>
        </div>

        <input type="file" accept=".txt" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
        <input type="file" accept="image/*" ref={imageInputRef} style={{ display: "none" }} onChange={handleImageUpload} />

        {showCamera && (
          <div className="mb-4">
            <video ref={videoRef} className="w-full rounded-xl mb-2" />
            <button onClick={takePhoto} className="px-4 py-2 bg-blue-500 text-white rounded-xl">
              Take Photo
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}

        {mode === "text" && (
          <div className="mb-4">
            <textarea
              className="w-full h-48 p-4 border-2 border-orange-400 rounded-xl bg-[#fff7e8]"
              placeholder="Paste or load your document text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}

        {error && <p className="text-red-600 mb-2">{error}</p>}

        {mode === "text" && (
          <button onClick={handleAnalyze} className="mt-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600">
            Analyze
          </button>
        )}
      </div>
    </div>
  );
}