import React from "react";

export default function SafetyGauge({ score = 0 }) {
  let status = "Good to go";
  if (score < 85) status = "Check the fine print";
  if (score < 50) status = "Wait, let's look closer";

  return (
    <div>
      <h3>Safety Score</h3>
      <p>Score: {score}</p>
      <p>Status: {status}</p>
    </div>
  );
}