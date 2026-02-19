export function calculateRiskScore(text) {
  const keywords = [
    "variable interest",
    "late fee",
    "penalty",
    "automatic renewal",
    "pre-payment penalty",
    "interest",
    "hidden fee",
  ];

  let score = 100;
  const lower = text.toLowerCase();

  keywords.forEach((kw) => {
    if (lower.includes(kw)) score -= 15;
  });

  return Math.max(score, 1);
}
