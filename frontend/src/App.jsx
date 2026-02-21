import { useState, useEffect } from "react";
import PopScreen from "./components/popScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <PopScreen />}

      {!showSplash && (
        <div className="min-h-screen flex items-center justify-center">
          <h1>Main App</h1>
        </div>
      )}
    </>
  );
}

  async function analyzeText(text) {
    setStep("processing");
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setResult(data);
      setStep("results");
    } catch (e) {
      setError("Failed to reach server. Is the backend running?");
      setStep("upload");
    }
  }

  if (step === "upload") {
    return <UploadScreen onSubmit={analyzeText} error={error} />;
  }

  if (step === "processing") {
    return <Processing />;
  }

  if (step === "results") {
    return <Results result={result} onBack={() => setStep("upload")} />;
  }

  return null;