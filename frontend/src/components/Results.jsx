import React from "react";

export default function Results({ result, onBack }) {
  if (!result) return null;

  const score = result.score ?? 78;

  let circleColor = "#2aa198"; // teal = good
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
      style={{
        minHeight: "100vh",
        background: "#f7f1e3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        color: "#0f172a",
      }}
    >
      {/* SCORE CIRCLE */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: circleColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 48,
          fontWeight: "bold",
          marginBottom: 16,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        {score}
      </div>

      {/* LABEL */}
      <div style={{ fontSize: 24, marginBottom: 24 }}>{label}</div>

      {/* SUMMARY BOX */}
      <div
        style={{
          maxWidth: 700,
          background: "white",
          border: "1px solid #2aa198",
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>Summary</h2>
        <p style={{ lineHeight: 1.6 }}>{result.summary}</p>

        {result.pros && (
          <>
            <h3 style={{ marginTop: 16 }}>Pros</h3>
            <ul>
              {result.pros.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </>
        )}

        {result.cons && (
          <>
            <h3 style={{ marginTop: 16 }}>Cons</h3>
            <ul>
              {result.cons.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        style={{
          border: "2px solid #2aa198",
          backgroundColor: "#ffffff",
          color: "#0f172a",
          fontWeight: 600,
          borderRadius: 12,
          padding: "12px 24px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#2aa198";
          e.target.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#ffffff";
          e.target.style.color = "#0f172a";
        }}
      >
        Analyze Another Document
      </button>
    </div>
  );
}