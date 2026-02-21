import React from "react";

export default function SafetyGauge({ score = 0 }) {
  let status = "Good to go";
  if (score < 85) status = "Check the fine print";
  if (score < 50) status = "Wait, let's look closer";

  return (
    <div className="mb-4 p-4 bg-slate-50 rounded-xl">
      <h3 className="font-semibold text-slate-700">Safety Score</h3>
      <p className="text-2xl font-bold text-blue-500">{score}</p>
      <p className="text-slate-600">{status}</p>
    </div>
  );
}