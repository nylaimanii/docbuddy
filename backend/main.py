# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.models import DocumentRequest, AnalysisResponse
from backend.services.analyzer import analyze_document

app = FastAPI(title="DocBuddy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "DocBuddy backend is running"}

@app.post("/analyze", response_model=AnalysisResponse)
def analyze(doc: DocumentRequest):
    result = analyze_document(doc.text)
    return result

