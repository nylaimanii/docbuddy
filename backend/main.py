from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DocumentRequest(BaseModel):
    text: str

@app.get("/")
def root():
    return {"message": "DocBuddy backend is alive"}

@app.post("/analyze")
def analyze_doc(req: DocumentRequest):
    text = req.text.lower()

    keywords = ["late fee", "penalty", "interest", "fee", "termination", "fine"]
    red_flags = []

    for word in keywords:
        if word in text:
            red_flags.append(f"Found risky term: {word}")

    score = 100 - (15 * len(red_flags))
    score = max(1, min(100, score))

    return {
        "score": score,
        "lowdown": [
            "This document describes a financial agreement.",
            "Some terms may cost you extra money.",
            "Review the fees and deadlines carefully."
        ],
        "redFlags": red_flags,
        "deadlines": [
            "Rent due: 1st of every month",
            "Late fee applies after 5 days"
        ],
        "futureMath": {
            "monthly": 1200,
            "yearly": 14400
        }
    }
