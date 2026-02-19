from fastapi import FastAPI
from pydantic import BaseModel
from backend.risk_engine import evaluate_document

app = FastAPI()

class DocumentRequest(BaseModel):
    text: str

@app.get("/")
def root():
    return {"message": "DocBuddy backend is alive 🧸"}

@app.post("/analyze")
def analyze_doc(req: DocumentRequest):
    result = evaluate_document(req.text)
    return result

