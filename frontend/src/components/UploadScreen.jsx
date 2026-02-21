import React, { useState, useRef } from "react";

export default function UploadScreen({ onSubmit, error }) {
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target.result);
    };
    reader.readAsText(file);
  }

  function handleImageUpload() {
    setText("Mock OCR text from image. The rent is $1200. Late fee is $75 after 5 days.");
  }

  function handleLiveCamera() {
    setText("Mock camera scan text. Lease is 12 months. Late fee is $75.");
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1>DocBuddy</h1>
      <p>Choose how to add your document:</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={handleLiveCamera}>Live Camera</button>
        <button onClick={() => imageInputRef.current.click()}>Photo Gallery</button>
        <button onClick={() => fileInputRef.current.click()}>Upload File</button>
        <button onClick={() => setText("")}>Paste Text</button>
      </div>

      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <div style={{ marginTop: "20px" }}>
        <textarea
          rows={10}
          style={{ width: "100%", padding: "10px" }}
          placeholder="Paste or load your document text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={() => onSubmit(text)}
        disabled={!text.trim()}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        Analyze
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}