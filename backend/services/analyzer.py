from backend.risk_engine import evaluate_document

def analyze(text: str):
    return evaluate_document(text)
