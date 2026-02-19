# backend/services/analyzer.py

from backend.risk_engine import calculate_risk_score, explain_red_flags

def analyze_document(text: str):
    risk_score = calculate_risk_score(text)
    red_flags = explain_red_flags(text)

    if risk_score >= 85:
        verdict = "Good to go"
        verdict_color = "bg-emerald-100 border-emerald-300 text-emerald-800"
    elif risk_score >= 50:
        verdict = "Check the fine print"
        verdict_color = "bg-yellow-100 border-yellow-300 text-yellow-800"
    else:
        verdict = "Wait and review carefully"
        verdict_color = "bg-rose-100 border-rose-300 text-rose-800"

    tldr = [
        "This document explains how and when you must make payments.",
        "There are fees or conditions that could increase the total cost.",
        "You should review the terms carefully before signing."
    ]

    payment_dates = [
        {"date": "1st of every month", "description": "Payment due"},
        {"date": "End of contract", "description": "Decide whether to renew or cancel"},
    ]

    future_projection = {
        "totalCost": 14400,
        "monthlyBreakdown": 1200,
        "additionalFees": 200,
    }

    return {
        "riskScore": risk_score,
        "verdict": verdict,
        "verdictColor": verdict_color,
        "tldr": tldr,
        "redFlags": red_flags,
        "paymentDates": payment_dates,
        "futureProjection": future_projection,
    }
