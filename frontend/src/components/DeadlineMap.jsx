import React from "react";

export default function DeadlineMap({ deadlines = [] }) {
  return (
    <div>
      <h3>Deadline Map</h3>
      {deadlines.length === 0 ? <p>No deadlines detected.</p> : (
        <ul>
          {deadlines.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      )}
    </div>
  );
}