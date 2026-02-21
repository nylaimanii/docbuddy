import React from "react";

export default function FutureMath({ data = { monthly: 0, yearly: 0 } }) {
  return (
    <div>
      <h3>Future Math</h3>
      <p>Monthly: ${data.monthly}</p>
      <p>Yearly: ${data.yearly}</p>
    </div>
  );
}