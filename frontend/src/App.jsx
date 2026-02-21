import React, { useState } from "react";
import Splash from "./components/Splash";
import UploadScreen from "./components/UploadScreen";
import Processing from "./components/Processing";
import Results from "./components/Results";

export default function App() {
  const [step, setStep] = useState("splash"); // splash | upload | processing | results
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function analyzeText(text) {
    setStep("processing");
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setResult(data);
      setStep("results");
    } catch (e) {
      setError("Failed to reach server.");
      setStep("upload");
    }
  }

  if (step === "splash") {
    return <Splash onStart={() => setStep("upload")} />;
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
}