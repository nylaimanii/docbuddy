import React from "react";

export default function Lowdown({ items = [] }) {
  return (
    <div>
      <h3>The Lowdown</h3>
      {items.length === 0 ? <p>No summary available.</p> : (
        <ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}