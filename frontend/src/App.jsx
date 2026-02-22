import React, { useState } from "react";
import IntroSplash from "./components/IntroSplash";
import HomePage from "./components/HomePage";
import LoadingPage from "./components/LoadingPage";
import Results from "./components/Results";

export default function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);

  const analyzeInput = async (payload) => {
    setPage("loading");

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const fakeResult = {
      score: 78,
      summary:
        "This document appears to contain important information. Key sections were detected and summarized. No critical red flags were found in this demo analysis.",
      pros: ["Easy to read", "Clear structure", "Contains key information"],
      cons: ["Some sections may need clarification"],
      deadlines: ["Review by next week", "Sign before end of month"],
      futureMath: { monthly: 49, yearly: 499 },
    };

    setResult(fakeResult);
    setPage("results");
  };

  const goHome = () => {
    setResult(null);
    setPage("home");
  };

  if (!started) {
    return <IntroSplash onStart={() => setStarted(true)} />;
  }

  return (
    <>
      {page === "home" && <HomePage onAnalyze={analyzeInput} />}
      {page === "loading" && <LoadingPage />}
      {page === "results" && <Results result={result} onBack={goHome} />}
    </>
  );
}