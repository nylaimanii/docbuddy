export function computeFinancialScore(result) {
  let score = 100;

  const rate = result.apr ?? result.interestRate ?? null;
  const termMonths = result.termMonths ?? null;
  const fees = result.fees ?? [];
  const prepaymentPenalty = result.prepaymentPenalty ?? false;

  if (rate !== null) {
    if (rate > 25) score -= 30;
    else if (rate > 15) score -= 20;
    else if (rate > 10) score -= 10;
  }

  if (termMonths !== null) {
    if (termMonths > 60) score -= 15;
    else if (termMonths > 36) score -= 10;
  }

  if (fees.length > 0) {
    score -= Math.min(20, fees.length * 5);
  }

  if (prepaymentPenalty === true) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}