# backend/risk_engine.py
# test line
import re
from backend.utils.keywords import RED_FLAG_KEYWORDS

import re
from backend.utils.keywords import RED_FLAG_KEYWORDS

def calculate_risk_score(text: str) -> dict:
    score = 100
    category_breakdown = {}
    lower_text = text.lower()

    for category, keywords in RED_FLAG_KEYWORDS.items():
        category_total = 0

        for keyword, data in keywords.items():
            weight = data["weight"]

            # Safe regex pattern with word boundaries
            pattern = r"\b" + re.escape(keyword) + r"\b"
            matches = re.findall(pattern, lower_text, flags=re.IGNORECASE)
            occurrences = len(matches)

            if occurrences > 0:
                # Cap penalty at 3x weight
                penalty = min(weight * occurrences, weight * 3)
                category_total += penalty

        if category_total > 0:
            category_breakdown[category] = category_total

        score -= category_total

    # Clamp score between 0 and 100
    score = max(min(score, 100), 0)

    return {
        "score": score,
        "category_breakdown": category_breakdown
    }


def explain_red_flags(text: str) -> list:
    explanations = []
    lower_text = text.lower()

    for category, keywords in RED_FLAG_KEYWORDS.items():
        for keyword, data in keywords.items():
            pattern = r"\b" + re.escape(keyword) + r"\b"
            matches = re.findall(pattern, lower_text, flags=re.IGNORECASE)
            occurrences = len(matches)

            if occurrences > 0:
                explanation = data["explanation"]
                explanations.append(
                    f"'{keyword}' appears {occurrences} time(s). {explanation}"
                )

    return explanations

    for keyword in RED_FLAG_KEYWORDS.keys():
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