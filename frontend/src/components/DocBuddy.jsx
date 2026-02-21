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
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1>DocBuddy Results</h1>

        <SafetyGauge score={result.score ?? 0} />
        <Lowdown items={result.lowdown || []} />
        <RedFlags flags={result.redFlags || []} />
        <DeadlineMap deadlines={result.deadlines || []} />
        <FutureMath data={result.futureMath || { monthly: 0, yearly: 0 }} />

        <button onClick={() => setStep("upload")} style={{ marginTop: "20px" }}>
          Analyze Another Document
        </button>
      </div>
    );
  }

  return null;
}