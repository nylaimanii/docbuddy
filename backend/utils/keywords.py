# backend/utils/keywords.py

RED_FLAG_KEYWORDS = {
    "interest": {
        r"\bvariable[- ]?interes(e|ts)\b": 20,
        r"\badjustable[- ]?rat(e|es)\b": 20,
        r"\bcompound[- ]?interes(e|ts)\b": 18,
        r"\bteaser[- ]?rat(e|es)\b": 22,
        r"\baccrued\b": 10,
    },
    "fees": {
        r"\blate[- ]?fe(e|es)\b": 10,
        r"\bhidden[- ]?fe(e|es)\b": 25,
        r"\bpre[- ]?payment penalt(y|ies)\b": 25,
        r"\bprocessing[- ]?fe(e|es)\b": 12,
        r"\bservice[- ]?charg(e|es)\b": 10,
        r"\badministrative[- ]?fe(e|es)\b": 12,
        r"\borigination[- ]?fe(e|es)\b": 20,
    },
    "contract_terms": {
        r"\bautomatic[- ]?renewa(l|ls)\b": 15,
        r"\bballoon[- ]?paymen(t|ts)\b": 30,
        r"\bsuble(t|ts)\b": 8,
    }
}
