import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

// Red flag keywords
const RED_FLAG_KEYWORDS = [
  "variable interest",
  "late fee",
  "penalty",
  "automatic renewal",
  "pre-payment penalty",
  "compound interest",
  "hidden fee",
  "processing fee",
  "service charge",
  "administrative fee",
  "origination fee",
  "balloon payment",
  "adjustable rate",
  "teaser rate",
  "accrued",
  "sublet",
  "interest",
];

// Calculate risk score from 1 to 100
const calculateRiskScore = (text) => {
  let score = 100;
  const lower = text.toLowerCase();
  RED_FLAG_KEYWORDS.forEach((kw) => {
    if (lower.includes(kw)) score -= 15;
  });
  return Math.max(score, 1);
};

// Simulate document evaluation
const evaluateDocument = (text) => {
  const riskScore = calculateRiskScore(text);

  let verdict = "Good to go!";
  let verdictColor = "bg-emerald-100 border-emerald-300 text-emerald-800";

  if (riskScore < 50) {
    verdict = "Wait, let's look closer";
    verdictColor = "bg-rose-100 border-rose-300 text-rose-800";
  } else if (riskScore < 85) {
    verdict = "Check the fine print";
    verdictColor = "bg-yellow-100 border-yellow-300 text-yellow-800";
  }

  const foundFlags = RED_FLAG_KEYWORDS.filter((kw) =>
    text.toLowerCase().includes(kw)
  );

  return {
    riskScore,
    verdict,
    verdictColor,
    tldr: [
      "Monthly payment is due on the 1st of each month.",
      "There are fees mentioned in the fine print.",
      "The term is 12 months with renewal language.",
    ],
    redFlags:
      foundFlags.length > 0
        ? foundFlags.map((f) => `Found risky term: "${f}"`)
        : [],
    paymentDates: [
      { date: "1st of every month", description: "Payment due" },
      { date: "End of lease", description: "Renew or move-out decision" },
      { date: "5-day grace period", description: "Late fee window closes" },
    ],
    futureProjection: {
      monthly: 1200,
      years: 5,
      interestRate: 0.06,
    },
  };
};

// Compute simple future total over N years
const computeFutureTotal = ({ monthly, years, interestRate }) => {
  const months = years * 12;
  const base = monthly * months;
  const interest = base * interestRate;
  return Math.round(base + interest);
};

// Safety Gauge component
const SafetyGauge = ({ score }) => {
  const colorClass =
    score >= 85
      ? "text-emerald-500"
      : score >= 50
      ? "text-yellow-500"
      : "text-rose-400";

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-36 h-36 -rotate-90" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        <motion.path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={colorClass}
          initial={{ strokeDasharray: "0, 100" }}
          animate={{ strokeDasharray: `${score}, 100` }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        >
          <div className={`text-3xl font-bold ${colorClass}`}>{score}</div>
          <div className="text-xs text-gray-500">Safety Score</div>
        </motion.div>
      </div>
    </div>
  );
};

// Mock camera view
const CameraView = ({ isScanning }) => (
  <motion.div
    className="relative bg-slate-900 rounded-2xl h-64 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-emerald-900" />
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-52 h-36 border-2 border-white rounded-xl"
        animate={{ scale: [1, 1.04, 1], borderColor: ["#fff", "#34d399", "#fff"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-white/10 rounded-xl flex items-center justify-center">
          <span className="text-white font-medium">Frame your document</span>
        </div>
      </motion.div>
    </div>
    {isScanning && (
      <motion.div
        className="absolute inset-0 bg-emerald-400/20"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    )}
  </motion.div>
);

// Main component
export default function DocBuddy() {
  const [step, setStep] = useState("upload"); // upload | processing | results
  const [results, setResults] = useState(null);
  const [selectedInput, setSelectedInput] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  const runMockFlow = () => {
    setStep("processing");
    setTimeout(() => {
      const mockText =
        "Apartment lease with late fee and variable interest. Automatic renewal and processing fee apply.";
      const res = evaluateDocument(mockText);
      setResults(res);
      setStep("results");
    }, 2200);
  };

  const handleInputSelect = (type) => {
    setSelectedInput(type);
    if (type === "camera") {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        runMockFlow();
      }, 1600);
    } else if (type === "file") {
      fileInputRef.current?.click();
    } else {
      runMockFlow();
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    runMockFlow();
  };

  if (step === "upload") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4">
        <div className="max-w-md mx-auto pt-8">
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-3xl font-bold text-gray-800">DocBuddy</h1>
            <p className="text-gray-600">Your friendly financial document analyzer</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Capture Hub
            </h2>

            {selectedInput === "camera" && <CameraView isScanning={isScanning} />}

            <div className="space-y-3 mt-4">
              <motion.button
                onClick={() => handleInputSelect("camera")}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-2xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Live Scan
              </motion.button>

              <motion.button
                onClick={() => handleInputSelect("gallery")}
                className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white p-4 rounded-2xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Photo Gallery
              </motion.button>

              <motion.button
                onClick={() => handleInputSelect("file")}
                className="w-full bg-gradient-to-r from-purple-400 to-purple-500 text-white p-4 rounded-2xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Upload File
              </motion.button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.png,.jpeg"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="hidden"
            />
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4 flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            Loading
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Scanning your document...</h2>
          <motion.p
            className="text-gray-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            Analyzing for risk and clarity
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const total5y = computeFutureTotal({
    monthly: results.futureProjection.monthly,
    years: results.futureProjection.years,
    interestRate: results.futureProjection.interestRate,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto">
        <motion.div className="text-center mb-6 pt-4" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-2xl font-bold text-gray-800">DocBuddy Analysis</h1>
        </motion.div>

        <motion.div className="bg-white rounded-2xl p-6 shadow-lg mb-4" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Safety Gauge</h3>
          <SafetyGauge score={results.riskScore} />
          <motion.div
            className={`mt-4 p-3 rounded-2xl border-2 text-center font-medium ${results.verdictColor}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: "spring" }}
          >
            {results.verdict}
          </motion.div>
        </motion.div>

        <motion.div className="bg-white rounded-2xl p-6 shadow-lg mb-4" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">The Lowdown</h3>
          <ul className="space-y-2">
            {results.tldr.map((p, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-700">{p}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {results.redFlags.length > 0 && (
          <motion.div className="bg-rose-50 rounded-2xl p-6 shadow-lg mb-4 border-2 border-rose-200" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h3 className="text-lg font-semibold text-rose-800 mb-3">Red Flag Alerts</h3>
            <ul className="space-y-2">
              {results.redFlags.map((f, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <span className="text-rose-700">{f}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div className="bg-white rounded-2xl p-6 shadow-lg mb-4" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">The Deadline Map</h3>
          <div className="space-y-3">
            {results.paymentDates.map((d, i) => (
              <motion.div key={i} className="flex justify-between items-center p-3 bg-blue-50 rounded-xl" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.1 }}>
                <span className="font-medium text-gray-800">{d.date}</span>
                <span className="text-sm text-gray-600">{d.description}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-2xl p-6 shadow-lg mb-6" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Future Math (5 years)</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">${total5y.toLocaleString()}</div>
            <div className="text-gray-600 mb-3">Estimated total with interest</div>
            <div className="bg-blue-50 p-4 rounded-xl text-sm text-gray-700">
              Monthly: ${results.futureProjection.monthly.toLocaleString()} <br />
              Estimated interest: {(results.futureProjection.interestRate * 100).toFixed(1)}%
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={() => {
            setStep("upload");
            setResults(null);
            setSelectedInput(null);
          }}
          className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-2xl font-medium mb-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Scan Another Document
        </motion.button>
      </div>
    </div>
  );
}
