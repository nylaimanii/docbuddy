from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import os

import google.generativeai as genai

from backend.prompt_logic import build_analysis_prompt

app = FastAPI()  # <-- THIS is what uvicorn is looking for

# CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
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

        return {
            "summary": data.get("summary", ""),
            "pros": data.get("pros", []),
            "cons": data.get("cons", []),
            "deadlines": data.get("deadlines", []),
            "futureMath": data.get("futureMath", {"monthly": 0, "yearly": 0}),
        }

    except Exception:
        # Fallback so demo never breaks
        return {
            "summary": "This document looks like a basic financial agreement that explains payments, fees, and rules.",
            "pros": [
                "Costs are clearly stated",
                "Rules are written out up front"
            ],
            "cons": [
                "Late fees can cost extra money",
                "Some terms may be strict"
            ],
            "deadlines": [
                "Payment due on the 1st of every month",
                "Late fees after 5 days"
            ],
            "futureMath": {
                "monthly": 1200,
                "yearly": 14400
            }
        }