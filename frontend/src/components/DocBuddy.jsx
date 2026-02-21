import React, { useState } from "react";
import UploadScreen from "./UploadScreen";
import Processing from "./Processing";
import Lowdown from "./Lowdown";
import SafetyGauge from "./SafetyGauge";
import RedFlags from "./RedFlags";
import DeadlineMap from "./DeadlineMap";
import FutureMath from "./FutureMath";
import { computeFinancialScore } from "../utils/scoring";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResult(data);
      setStep("results");
    } catch (err) {
      console.error(err);
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
    const score = computeFinancialScore(result);

    return (
      <div className="min-h-screen bg-[#fff7e8] p-6 flex justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-1">DocBuddy Results</h1>
          <p className="text-blue-600 mb-4">Here’s the real deal</p>

          <Lowdown
            summary={result.summary}
            pros={result.pros || []}
            cons={result.cons || []}
          />

          <SafetyGauge score={score} />
          <RedFlags flags={result.redFlags || []} />
          <DeadlineMap deadlines={result.deadlines || []} />
          <FutureMath data={result.futureMath || {}} />

          <button
            onClick={() => setStep("upload")}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            Analyze Another Document
          </button>
        </div>
      </div>
    );
  }

  return null;
}