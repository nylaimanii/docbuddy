import React from "react";

export default function DeadlineMap({ deadlines = [] }) {
  return (
    <div className="mb-4 p-4 bg-slate-50 rounded-xl">
      <h3 className="font-semibold text-slate-700 mb-2">Deadline Map</h3>
      {deadlines.length === 0 ? (
        <p className="text-slate-600">No deadlines detected.</p>
      ) : (
        <ul className="list-disc pl-5 text-slate-700">
          {deadlines.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      )}
    </div>
  );
}