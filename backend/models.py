# backend/models.py

from pydantic import BaseModel
from typing import List

class DocumentRequest(BaseModel):
    text: str

class PaymentDate(BaseModel):
    date: str
    description: str

class FutureProjection(BaseModel):
    totalCost: int
    monthlyBreakdown: int
    additionalFees: int

class AnalysisResponse(BaseModel):
    riskScore: int
    verdict: str
    verdictColor: str
    tldr: List[str]
    redFlags: List[str]
    paymentDates: List[PaymentDate]
    futureProjection: FutureProjection
