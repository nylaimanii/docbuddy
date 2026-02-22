import React from "react";

export default function Results({ result, onBack }) {
  if (!result) return null;

  const score = result.score ?? 78;

  let circleColor = "#22c55e"; // green
  let label = "Good Choice";

  if (score < 40) {
    circleColor = "#ef4444"; // red
    label = "Bad Choice";
  } else if (score < 70) {
    circleColor = "#f59e0b"; // yellow
    label = "Mid Choice";
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6"
      style={{ background: "#f7f1e3", color: "#0f172a" }}
    >
      {/* SCORE CIRCLE */}
      <div
        className="flex items-center justify-center mb-4"
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: circleColor,
          color: "white",
          fontSize: 48,
          fontWeight: "bold",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        {score}
      </div>

      {/* LABEL */}
      <div className="text-2xl mb-6 font-semibold">{label}</div>

      {/* SUMMARY BOX */}
      <div
        className="w-full max-w-2xl mb-6"
        style={{
          background: "white",
          border: "1px solid #2aa198",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2 className="text-2xl mb-3 font-semibold">Summary</h2>
        <p style={{ lineHeight: 1.6 }}>{result.summary}</p>

        {result.pros && (
          <>
            <h3 className="mt-4 font-semibold">Pros</h3>
            <ul className="list-disc ml-6">
              {result.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </>
        )}

        {result.cons && (
          <>
            <h3 className="mt-4 font-semibold">Cons</h3>
            <ul className="list-disc ml-6">
              {result.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="btn-primary px-6 py-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
      >
        Analyze Another Document
      </button>
    </div>
  );
}