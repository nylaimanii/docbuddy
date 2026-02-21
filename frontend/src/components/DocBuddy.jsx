import React, { useState } from "react";
import UploadScreen from "./UploadScreen";
import Processing from "./Processing";
import SafetyGauge from "./SafetyGauge";
import Lowdown from "./Lowdown";
import RedFlags from "./RedFlags";
import DeadlineMap from "./DeadlineMap";
import FutureMath from "./FutureMath";

export default function DocBuddy() {
  const [step, setStep] = useState("upload"); // "upload" | "processing" | "results"
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function analyzeText(text) {
    setStep("processing");
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setResult(data);
      setStep("results");
    } catch (err) {
      console.error(err);
      setError("Failed to reach server. Is the backend running?");
      setStep("upload");
    }
  }

  // Upload screen
  if (step === "upload") {
    return <UploadScreen onSubmit={analyzeText} error={error} />;
  }

  // Processing / loading screen
  if (step === "processing") {
    return <Processing />;
  }

  // Results screen
  if (step === "results" && result) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full">
          {/* Header */}
          <div
            className="rounded-xl p-4 mb-4 text-white"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            }}
          >
            <h1 className="text-3xl font-bold">DocBuddy Results</h1>
            <p className="text-blue-100">Here’s the real deal</p>
          </div>

          {/* Summary */}
          {result.summary && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-slate-700">{result.summary}</p>
            </div>
          )}

          <SafetyGauge score={result.score ?? 0} />
          <Lowdown items={result.lowdown || []} />
          <RedFlags flags={result.redFlags || []} />
          <DeadlineMap deadlines={result.deadlines || []} />
          <FutureMath data={result.futureMath || { monthly: 0, yearly: 0 }} />

          <button
            onClick={() => setStep("upload")}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition shadow"
          >
            Analyze Another Document
          </button>
        </div>
      </div>
    );
  }

  return null;
}