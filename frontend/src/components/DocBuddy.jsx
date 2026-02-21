import React, { useState } from "react";
import UploadScreen from "./UploadScreen";
import Processing from "./Processing";

export default function DocBuddy() {
  const [step, setStep] = useState("upload"); // "upload" | "processing" | "results"
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function analyzeText(text) {
    setStep("processing");
    setError(null);

    try {
      // Add a timeout so we never get stuck forever
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      // Basic validation so we don’t crash the UI
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response");
      }

      setResult(data);
      setStep("results");
    } catch (err) {
      console.error("Analyze error:", err);
      setError(
        "We couldn’t analyze this right now. Make sure the backend is running and try again."
      );
      setStep("upload");
    }
  }

  // Upload screen
  if (step === "upload") {
    return <UploadScreen onSubmit={analyzeText} error={error} />;
  }

  // Processing screen
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
            className="rounded-xl p-4 mb-6 text-white"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            }}
          >
            <h1 className="text-3xl font-bold">DocBuddy Results</h1>
            <p className="text-blue-100">Here’s the real deal</p>
          </div>

          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-slate-700">
              {result.summary || "No summary available."}
            </p>
          </section>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <section className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="font-semibold text-green-700 mb-2">Pros</h3>
              <ul className="list-disc list-inside text-green-800">
                {result.pros && result.pros.length > 0 ? (
                  result.pros.map((item, idx) => <li key={idx}>{item}</li>)
                ) : (
                  <li>No clear benefits found.</li>
                )}
              </ul>
            </section>

            <section className="bg-red-50 border border-red-100 rounded-xl p-4">
              <h3 className="font-semibold text-red-700 mb-2">Cons</h3>
              <ul className="list-disc list-inside text-red-800">
                {result.cons && result.cons.length > 0 ? (
                  result.cons.map((item, idx) => <li key={idx}>{item}</li>)
                ) : (
                  <li>No major risks found.</li>
                )}
              </ul>
            </section>
          </div>

          {/* Deadlines */}
          <section className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h3 className="font-semibold text-blue-700 mb-2">Important Dates</h3>
            <ul className="list-disc list-inside text-blue-800">
              {result.deadlines && result.deadlines.length > 0 ? (
                result.deadlines.map((d, idx) => <li key={idx}>{d}</li>)
              ) : (
                <li>No deadlines detected.</li>
              )}
            </ul>
          </section>

          {/* Costs */}
          <section className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Cost Breakdown</h3>
            <ul className="list-disc list-inside text-slate-700">
              <li>Monthly: ${result.futureMath?.monthly ?? 0}</li>
              <li>Yearly: ${result.futureMath?.yearly ?? 0}</li>
            </ul>
          </section>

          <button
            onClick={() => setStep("upload")}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition shadow"
          >
            Analyze Another Document
          </button>
        </div>
      </div>
    );
  }

  return null;
}
}