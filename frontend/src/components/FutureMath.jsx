import React from "react";

export default function FutureMath({ data = { monthly: 0, yearly: 0 } }) {
  return (
    <div className="mb-4 p-4 bg-slate-50 rounded-xl">
      <h3 className="font-semibold text-slate-700 mb-2">Future Math</h3>
      <p className="text-slate-700">Monthly: ${data.monthly}</p>
      <p className="text-slate-700">Yearly: ${data.yearly}</p>
    </div>
  );
}