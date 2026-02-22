import React from "react";

export default function Results({ result, onBack }) {
  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#fff7e8] p-6 flex justify-center">
      <div className="bg-white rounded-2xl shadow p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2">DocBuddy Results</h1>

        <p className="mb-4">{result.summary}</p>

        <h2 className="font-semibold">Pros</h2>
        <ul className="list-disc ml-5 mb-3">
          {result.pros?.map((p, i) => <li key={i}>{p}</li>)}
        </ul>

        <h2 className="font-semibold">Cons</h2>
        <ul className="list-disc ml-5 mb-3">
          {result.cons?.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <h2 className="font-semibold">Deadlines</h2>
        <ul className="list-disc ml-5 mb-3">
          {result.deadlines?.map((d, i) => <li key={i}>{d}</li>)}
        </ul>

        <h2 className="font-semibold">Costs</h2>
        <p>Monthly: ${result.futureMath?.monthly || 0}</p>
        <p>Yearly: ${result.futureMath?.yearly || 0}</p>

        <button
          onClick={onBack}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-xl"
        >
          Analyze Another Document
        </button>
      </div>
    </div>
  );
}