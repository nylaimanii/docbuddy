from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class DocumentRequest(BaseModel):
    text: str

@app.get("/")
def root():
    return {"message": "DocBuddy backend is alive 🚀"}

@app.post("/analyze")
def analyze_doc(req: DocumentRequest):
    # Mock response for now
    return {
        "score": 72,
        "lowdown": [
            "Monthly rent is $1,200 due on the 1st",
            "Lease is 12 months long",
            "Late fee applies after 5 days"
        ],
        "redFlags": [
            "Late fee is $75 (pretty steep)"
        ],
        "deadlines": [
            "Rent due: 1st of every month",
            "Deposit due: Before move-in"
        ],
        "futureMath": {
            "monthly": 1200,
            "yearly": 14400
        }
    }
