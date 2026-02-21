import React, { useState } from "react";
import UploadScreen from "./UploadScreen";
import Processing from "./Processing";
import SafetyGauge from "./SafetyGauge";
import Lowdown from "./Lowdown";
import RedFlags from "./RedFlags";
import DeadlineMap from "./DeadlineMap";
import FutureMath from "./FutureMath";

export default function DocBuddy() {
  const [step, setStep] = useState("upload"); // upload | processing | results
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function analyzeText(text) {
    setStep("processing");
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResult(data);
      setStep("results");
    } catch (err) {
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

  if (step === "results" && result) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">DocBuddy Results</h1>

          <SafetyGauge score={result.score ?? 0} />
          <Lowdown items={result.lowdown || []} />
          <RedFlags flags={result.redFlags || []} />
          <DeadlineMap deadlines={result.deadlines || []} />
          <FutureMath data={result.futureMath || { monthly: 0, yearly: 0 }} />

          <button
            onClick={() => setStep("upload")}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Analyze Another Document
          </button>
        </div>
      </div>
    );
  }

  return null;
}