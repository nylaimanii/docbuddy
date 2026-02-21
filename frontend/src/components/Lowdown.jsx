import React from "react";

export default function Lowdown({ items = [] }) {
  return (
    <div className="mb-4 p-4 bg-slate-50 rounded-xl">
      <h3 className="font-semibold text-slate-700 mb-2">The Lowdown</h3>
      {items.length === 0 ? (
        <p className="text-slate-600">No summary available.</p>
      ) : (
        <ul className="list-disc pl-5 text-slate-700">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}