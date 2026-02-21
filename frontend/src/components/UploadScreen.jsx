import React, { useState, useRef, useEffect } from "react";

export default function UploadScreen({ onSubmit, error }) {
  const [text, setText] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [mode, setMode] = useState(null); // null | "text" | "file" | "image" | "camera"

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Start camera
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
      setMode("camera");
    } catch (err) {
      alert("Could not access camera. Please allow camera permissions.");
    }
  }

  // Stop camera
  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  }

  // Capture photo
  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    stopCamera();

    // Mock OCR result for now
    setText("Scanned from camera. The rent is $1200. Late fee is $75 after 5 days.");
    setMode("text");
  }

  // File upload (text files)
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

  // Photo gallery (mock OCR for now)
  function handleImageUpload() {
    setText("Scanned from image. The lease is 12 months. Late fee is $75.");
    setMode("text");
  }

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl w-full">
        {/* Header */}
        <div
          className="rounded-xl p-4 mb-4 text-white"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
          }}
        >
          <h1 className="text-3xl font-bold">DocBuddy</h1>
          <p className="text-blue-100">Understand before you sign</p>
        </div>

        <p className="text-slate-600 mb-4">Add your document to analyze:</p>

        <div className="flex gap-3 flex-wrap mb-4">
          <button
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-xl transition border border-blue-100"
            onClick={startCamera}
          >
            Live Camera
          </button>

          <button
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-xl transition border border-blue-100"
            onClick={() => {
              setMode("image");
              imageInputRef.current.click();
            }}
          >
            Photo Gallery
          </button>

          <button
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-xl transition border border-blue-100"
            onClick={() => {
              setMode("file");
              fileInputRef.current.click();
            }}
          >
            Upload File
          </button>

          <button
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-xl transition border border-blue-100"
            onClick={() => {
              setText("");
              setMode("text");
            }}
          >
            Paste Text
          </button>
        </div>

        {/* Hidden inputs */}
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

        {/* Camera Preview */}
        {showCamera && (
          <div className="mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-xl mb-2"
            />
            <button
              onClick={capturePhoto}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
            >
              Capture Photo
            </button>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {/* Text area only shows after a mode is chosen */}
        {mode === "text" && (
          <>
            <textarea
              rows={8}
              className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              placeholder="Paste or load your document text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={() => onSubmit(text)}
              disabled={!text.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition shadow disabled:opacity-50"
            >
              Analyze
            </button>
          </>
        )}

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}