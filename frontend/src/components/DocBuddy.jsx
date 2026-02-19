import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { analyzeDocument } from "../services/api";

export default function DocBuddy() {
  const [step, setStep] = useState("upload");
  const [results, setResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  const runRealFlow = async (text) => {
    setStep("processing");
    try {
      const data = await analyzeDocument(text || "Sample lease with late fee and variable interest");
      setResults(data);
      setStep("results");
    } catch (err) {
      console.error(err);
      alert("Something went wrong talking to the server.");
      setStep("upload");
    }
  };

  const handleFile = async (file) => {
    if (!file) return;
    const text = await file.text();
    runRealFlow(text);
  };

  const SafetyGauge = ({ score }) => {
    const getColor = () => {
      if (score >= 85) return "text-emerald-500";
      if (score >= 50) return "text-yellow-500";
      return "text-rose-400";
    };

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <motion.path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            className={getColor()}
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${score}, 100` }}
            transition={{ duration: 1.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getColor()}`}>{score}</div>
            <div className="text-xs text-slate-500">Safety Score</div>
          </div>
        </div>
      </div>
    );
  };

  if (step === "upload") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4">
        <div className="max-w-md mx-auto pt-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">DocBuddy</h1>
            <p className="text-slate-600 mt-1">A simple way to understand documents</p>
            <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
              Student-friendly
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 text-center">
              Add your document
            </h2>

            <div className="space-y-3">
              <motion.button
                onClick={() => {
                  setIsScanning(true);
                  setTimeout(() => {
                    setIsScanning(false);
                    runRealFlow("Scanned document text");
                  }, 1500);
                }}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-2xl font-medium shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Live Scan
              </motion.button>

              <motion.button
                onClick={() => runRealFlow("Gallery document text")}
                className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white p-4 rounded-2xl font-medium shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Photo Gallery
              </motion.button>

              <motion.button
                onClick={() => fileInputRef.current.click()}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-2xl font-medium shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Upload File
              </motion.button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <h2 className="text-xl font-semibold text-slate-800">Analyzing your document</h2>
          <p className="text-slate-600 mt-1">This will only take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto pt-6 space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Safety Check</h3>
          <SafetyGauge score={results.riskScore} />
          <div className={`mt-4 inline-block px-4 py-2 rounded-full border text-sm font-medium ${results.verdictColor}`}>
            {results.verdict}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Summary</h3>
          <ul className="space-y-2">
            {results.tldr.map((item, i) => (
              <li key={i} className="bg-emerald-50 rounded-xl p-3 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {results.redFlags.length > 0 && (
          <div className="bg-rose-50 rounded-2xl p-6 shadow-lg border border-rose-200">
            <h3 className="text-lg font-semibold text-rose-800 mb-3">Things to watch for</h3>
            <ul className="space-y-2">
              {results.redFlags.map((item, i) => (
                <li key={i} className="bg-white rounded-xl p-3 text-rose-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Important dates</h3>
          <div className="space-y-2">
            {results.paymentDates.map((p, i) => (
              <div key={i} className="flex justify-between bg-blue-50 rounded-xl p-3">
                <span className="font-medium text-slate-800">{p.date}</span>
                <span className="text-slate-600">{p.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Estimated cost</h3>
          <div className="text-3xl font-bold text-blue-600">
            ${results.futureProjection.totalCost.toLocaleString()}
          </div>
          <p className="text-slate-600 mt-1">Based on current information</p>
        </div>

        <motion.button
          onClick={() => {
            setStep("upload");
            setResults(null);
          }}
          className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-2xl font-medium shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Analyze another document
        </motion.button>
      </div>
    </div>
  );
}
