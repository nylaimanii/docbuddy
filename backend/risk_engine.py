from backend.utils.keywords import RED_FLAG_KEYWORDS

def calculate_risk_score(text: str) -> int:
    score = 100
    lower = text.lower()

    for kw in RED_FLAG_KEYWORDS:
        if kw in lower:
            score -= 15

    return max(score, 1)

def evaluate_document(text: str):
    score = calculate_risk_score(text)

    if score >= 85:
        verdict = "Good to go!"
        verdictColor = "bg-green-100 border-green-300 text-green-800"
    elif score >= 50:
        verdict = "Check the fine print"
        verdictColor = "bg-yellow-100 border-yellow-300 text-yellow-800"
    else:
        verdict = "Wait, let's look closer"
        verdictColor = "bg-red-100 border-red-300 text-red-800"

    red_flags_found = [kw for kw in RED_FLAG_KEYWORDS if kw in text.lower()]

    return {
        "riskScore": score,
        "verdict": verdict,
        "verdictColor": verdictColor,
        "tldr": [
            "Monthly payment is due on the 1st of each month (no cap, pretty standard)",
            "There are penalties and fees hidden in the fine print (side-eye)",
            "12-month commitment with auto-renew vibes"
        ],
        "redFlags": [f"Found risky term: {kw}" for kw in red_flags_found],
        "paymentDates": [
            {"date": "1st of every month", "description": "Payment due"},
            {"date": "End of lease", "description": "Renewal or move-out decision"}
        ],
        "futureProjection": {
            "totalCost": 14400,
            "monthlyBreakdown": 1200,
            "additionalFees": 200
        }
    }
