import React, { useState } from "react";
import IntroSplash from "./components/IntroSplash";
import HomePage from "./components/HomePage";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-600">
      {started ? (
        <HomePage />
      ) : (
        <IntroSplash onStart={() => setStarted(true)} />
      )}
    </div>
  );
}