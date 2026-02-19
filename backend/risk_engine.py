# backend/risk_engine.py

from backend.utils.keywords import RED_FLAG_KEYWORDS

def calculate_risk_score(text: str) -> int:
    score = 100
    lower_text = text.lower()

    for keyword in RED_FLAG_KEYWORDS:
        if keyword in lower_text:
            score -= 15

    return max(score, 1)


def explain_red_flags(text: str):
    explanations = []
    lower_text = text.lower()

    for keyword in RED_FLAG_KEYWORDS:
        if keyword in lower_text:
            if keyword in ["variable interest", "adjustable rate"]:
                explanations.append(
                    "This document includes a variable interest rate. This means your payments could increase over time."
                )
            elif keyword == "late fee":
                explanations.append(
                    "This document includes a late fee. You may have to pay extra if you miss a payment."
                )
            elif keyword == "automatic renewal":
                explanations.append(
                    "This document renews automatically unless you cancel it. You could be locked in longer than you expect."
                )
            elif keyword == "pre-payment penalty":
                explanations.append(
                    "This document includes a penalty for paying early. This can make it harder to save money."
                )
            else:
                explanations.append(
                    f"This document includes '{keyword}', which could increase your costs or limit your options."
                )

    return explanations

