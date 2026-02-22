def build_analysis_prompt(document_text: str, risk_data: dict, extracted_data: dict) -> str:
    score = risk_data.get("score", 50)
    breakdown = risk_data.get("category_breakdown", {})
    monthly = extracted_data.get("monthly", 0)
    yearly = extracted_data.get("yearly", 0)
    deadlines = extracted_data.get("deadlines", [])

    return f"""
You are DocBuddy, a helpful assistant that explains financial documents in simple, clear language for college students.

This document has already been analyzed by a rule-based risk engine.

Risk Score (0-100, lower = riskier): {score}
Risk Breakdown:
- Fees Risk: {breakdown.get("fees", 0)}
- Interest Risk: {breakdown.get("interest", 0)}
- Contract Risk: {breakdown.get("contract", 0)}
Detected Monthly Estimate: {monthly}
Detected Yearly Estimate: {yearly}
Detected Deadlines: {deadlines}

Your task:
- Explain the document clearly in 2-4 sentences.
- List main pros.
- List main cons (especially risks detected above).
- Confirm or refine cost estimates.
- Mention deadlines clearly.

IMPORTANT:
- Output ONLY valid JSON.
- No markdown.
- No extra commentary.
- No code fences.

JSON format:

{{
  "summary": "2-4 sentence summary.",
  "pros": [],
  "cons": [],
  "deadlines": [],
  "futureMath": {{
    "monthly": 0,
    "yearly": 0
  }}
}}

Document:
\"\"\"{document_text}\"\"\"
"""

import re

def extract_costs(text: str) -> dict:
    matches = re.findall(r"\$([\d,]+)", text)
    numbers = [int(m.replace(",", "")) for m in matches]

    if not numbers:
        return {"monthly": 0, "yearly": 0}

    monthly = min(numbers)
    yearly = monthly * 12

    return {"monthly": monthly, "yearly": yearly}


def extract_deadlines(text: str) -> list:
    deadlines = []

    if "due date" in text.lower():
        deadlines.append("There is a specific payment due date.")

    if "late fee" in text.lower():
        deadlines.append("Late fees apply if payment is late.")

    if "automatic renewal" in text.lower():
        deadlines.append("The contract renews automatically unless canceled.")

    return deadlines

def calculate_risk_score(text: str) -> dict:
    score = 100
    breakdown = {}

    if "late fee" in text.lower():
        score -= 10
        breakdown["fees"] = breakdown.get("fees", 0) + 10

    if "variable interest" in text.lower():
        score -= 15
        breakdown["interest"] = breakdown.get("interest", 0) + 15

    if "automatic renewal" in text.lower():
        score -= 8
        breakdown["contract"] = breakdown.get("contract", 0) + 8

    return {
        "score": max(score, 0),
        "category_breakdown": breakdown
    }

from backend.llm import call_gemini

def analyze_document(document_text: str) -> dict:

    # 1️⃣ Deterministic extraction
    risk_data = calculate_risk_score(document_text)
    cost_data = extract_costs(document_text)
    deadline_data = extract_deadlines(document_text)

    extracted_data = {
        **cost_data,
        "deadlines": deadline_data
    }

    # 2️⃣ Build enriched prompt
    prompt = build_analysis_prompt(
        document_text,
        risk_data,
        extracted_data
    )

    # 3️⃣ Call LLM
    llm_result = call_gemini(prompt)

    # 4️⃣ Merge outputs
    return {
        "riskScore": risk_data["score"],
        "riskBreakdown": risk_data["category_breakdown"],
        "detectedCosts": cost_data,
        "detectedDeadlines": deadline_data,
        "llmAnalysis": llm_result
    }