import React, { useEffect, useRef, useState } from "react";

export default function HomePage({ onAnalyze }) {
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [mode, setMode] = useState(null);
  const [text, setText] = useState("");
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (mode === "camera" && stream && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play().catch(() => {});
      };
    }
  }, [mode, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  };

  const handlePasteText = () => {
    stopCamera();
    setMode("text");
  };

  const handleUploadFile = () => {
    stopCamera();
    fileInputRef.current.click();
  };

  const handlePhotoGallery = () => {
    stopCamera();
    galleryInputRef.current.click();
  };

  const handleLiveCamera = async () => {
    stopCamera();
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setStream(mediaStream);
      setMode("camera");
    } catch (err) {
      alert("Could not access camera. Please allow camera permission.");
    }
  };

  const submitText = () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }
    onAnalyze({ type: "text", data: text });
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth;
    const height = video.videoHeight;
    if (!width || !height) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    const imageData = canvas.toDataURL("image/png");
    stopCamera();
    setMode(null);

    onAnalyze({ type: "camera", data: imageData });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#f7f1e3", color: "#0f172a" }}
    >
      <h1 className="text-5xl font-semibold mb-12" style={{ color: "#0f172a" }}>
        DocBuddy
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl mb-10">
        <button onClick={handlePasteText} className="btn-primary h-24 text-xl">
          Paste Text
        </button>
        <button onClick={handleUploadFile} className="btn-primary h-24 text-xl">
          Upload File
        </button>
        <button onClick={handleLiveCamera} className="btn-primary h-24 text-xl">
          Live Camera
        </button>
        <button onClick={handlePhotoGallery} className="btn-primary h-24 text-xl">
          Photo Gallery
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onAnalyze({ type: "file", data: file });
        }}
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onAnalyze({ type: "image", data: file });
        }}
      />

      {mode === "text" && (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          <textarea
            className="input-box h-48"
            placeholder="Paste or type your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              background: "#ffffff",
              borderColor: "#2aa198",
              color: "#0f172a",
            }}
          />
          <button onClick={submitText} className="btn-primary self-end px-6 py-3">
            Analyze Text
          </button>
        </div>
      )}

      {mode === "camera" && (
        <div className="flex flex-col items-center gap-4">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-80 h-60 rounded-xl border"
            style={{ borderColor: "#2aa198", background: "#0f172a" }}
          />
          <button onClick={takePhoto} className="btn-primary px-6 py-3">
            Take Photo
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}