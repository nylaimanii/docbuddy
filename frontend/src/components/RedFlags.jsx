import React from "react";

export default function RedFlags({ flags = [] }) {
  return (
    <div>
      <h3>Red Flags</h3>
      {flags.length === 0 ? <p>No major red flags found.</p> : (
        <ul>
          {flags.map((flag, i) => <li key={i}>{flag}</li>)}
        </ul>
      )}
    </div>
  );
}