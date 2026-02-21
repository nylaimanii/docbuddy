return (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="card max-w-xl w-full">
      <h1 className="text-3xl font-bold text-blue-500 mb-2">DocBuddy</h1>
      <p className="text-slate-600 mb-4">Add your document to analyze:</p>

      <div className="flex gap-3 flex-wrap mb-4">
        <button className="btn-secondary" onClick={handleLiveCamera}>
          Live Camera
        </button>
        <button
          className="btn-secondary"
          onClick={() => imageInputRef.current.click()}
        >
          Photo Gallery
        </button>
        <button
          className="btn-secondary"
          onClick={() => fileInputRef.current.click()}
        >
          Upload File
        </button>
        <button className="btn-secondary" onClick={() => setText("")}>
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
        className="input-box mb-4"
        placeholder="Paste or load your document text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={() => onSubmit(text)}
        disabled={!text.trim()}
        className="btn-primary w-full"
      >
        Analyze
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  </div>
);