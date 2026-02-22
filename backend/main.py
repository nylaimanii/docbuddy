from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    text: str

@app.post("/analyze")
async def analyze(req: AnalyzeRequest):
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")

    # Mock AI response for now (stable demo)
    return {
        "summary": "This document looks like a rental or financial agreement explaining payments, rules, and fees.",
        "pros": [
            "Costs are stated clearly",
            "Rules are written out"
        ],
        "cons": [
            "Late fees can add up",
            "Long commitment"
        ],
        "deadlines": [
            "Rent due on the 1st of each month",
            "Late fee after 5 days"
        ],
        "futureMath": {
            "monthly": 1200,
            "yearly": 14400
        }
    }