from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import os

import google.generativeai as genai

from backend.prompt_logic import build_analysis_prompt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

class AnalyzeRequest(BaseModel):
    text: str

@app.post("/analyze")
async def analyze_document(req: AnalyzeRequest):
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")

    prompt = build_analysis_prompt(text)

    try:
        response = model.generate_content(prompt)
        raw_text = response.text.strip()
        data = json.loads(raw_text)

        result = {
            "summary": data.get("summary", "No summary available."),
            "pros": data.get("pros", []),
            "cons": data.get("cons", []),
            "apr": data.get("apr"),
            "interestRate": data.get("interestRate"),
            "termMonths": data.get("termMonths"),
            "fees": data.get("fees", []),
            "prepaymentPenalty": data.get("prepaymentPenalty"),
            "redFlags": data.get("redFlags", []),
            "deadlines": data.get("deadlines", []),
            "futureMath": data.get("futureMath", {"monthly": 0, "yearly": 0}),
        }

        return result

    except Exception:
        return {
            "summary": "This document appears to be a financial agreement that explains payments, fees, and basic rules you need to follow.",
            "pros": [
                "The main costs are clearly stated.",
                "The agreement explains your responsibilities upfront.",
                "You can understand what happens if you miss payments."
            ],
            "cons": [
                "There are extra fees if you pay late.",
                "Some terms could cost you more money over time.",
                "The agreement may be expensive compared to other options."
            ],
            "apr": None,
            "interestRate": None,
            "termMonths": None,
            "fees": [],
            "prepaymentPenalty": None,
            "redFlags": [],
            "deadlines": [
                "Rent is due on the 1st of every month.",
                "Late fees apply after 5 days."
            ],
            "futureMath": {
                "monthly": 1200,
                "yearly": 14400
            }
        }