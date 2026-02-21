# backend/utils/keywords.py

RED_FLAG_KEYWORDS = {
    # -----------------------------------
    # Interest & Rate Risk
    # -----------------------------------
    "interest_terms": {

        "variable interest": {"weight": 20},
        "adjustable rate": {"weight": 20},
        "variable apr": {"weight": 20},
        "penalty apr": {"weight": 25},
        "default interest": {"weight": 25},
        "compound interest": {"weight": 15},
        "deferred interest": {"weight": 25},
        "accrued interest": {"weight": 10},
        "daily periodic rate": {"weight": 15},
        "finance charge": {"weight": 15},
        "teaser rate": {"weight": 20},
        "promotional apr": {"weight": 15},
        "introductory rate": {"weight": 15},
        "rate subject to change": {"weight": 20}
    },


    # -----------------------------------
    # Fees & Direct Charges
    # -----------------------------------
    "fees_and_penalties": {

        "late fee": {"weight": 10},
        "processing fee": {"weight": 10},
        "service charge": {"weight": 10},
        "administrative fee": {"weight": 10},
        "origination fee": {"weight": 15},
        "annual fee": {"weight": 15},
        "cancellation fee": {"weight": 15},
        "early termination fee": {"weight": 25},
        "pre-payment penalty": {"weight": 25},
        "non-refundable": {"weight": 20},
        "collection costs": {"weight": 20},
        "attorney’s fees": {"weight": 20},
        "liquidated damages": {"weight": 25},
        "over-the-limit fee": {"weight": 15},
        "cash advance fee": {"weight": 15},
        "foreign transaction fee": {"weight": 10},
        "reinstatement fee": {"weight": 10},
        "balloon payment": {"weight": 30}
    },


    # -----------------------------------
    # Termination & Lock-In Risk
    # -----------------------------------
    "termination_and_lockin": {

        "automatic renewal": {"weight": 15},
        "recurring billing": {"weight": 15},
        "automatic debit": {"weight": 20},
        "termination for convenience": {"weight": 20},
        "notice period": {"weight": 10},
        "irrevocable": {"weight": 25},
        "non-cancellable": {"weight": 25},
        "exclusive agreement": {"weight": 15},
        "sublease restriction": {"weight": 15}
    },


    # -----------------------------------
    # Legal Rights & Dispute Resolution
    # -----------------------------------
    "legal_rights_and_dispute": {

        "binding arbitration": {"weight": 30},
        "arbitration clause": {"weight": 30},
        "waiver of jury trial": {"weight": 30},
        "class action waiver": {"weight": 30},
        "governing law": {"weight": 5},
        "jurisdiction": {"weight": 5},
        "venue": {"weight": 5},
        "entire agreement": {"weight": 5},
        "amendment without notice": {"weight": 20},
        "force majeure": {"weight": 10}
    },


    # -----------------------------------
    # Liability & Financial Exposure
    # -----------------------------------
    "liability_and_financial_exposure": {

        "indemnify": {"weight": 20},
        "indemnification": {"weight": 20},
        "hold harmless": {"weight": 20},
        "limitation of liability": {"weight": 25},
        "personal guarantee": {"weight": 30},
        "confession of judgment": {"weight": 30},
        "lien": {"weight": 25},
        "collateral": {"weight": 20},
        "secured interest": {"weight": 25},
        "repossession": {"weight": 25}
    },


    # -----------------------------------
    # Data & Privacy Risk
    # -----------------------------------
    "data_and_privacy": {

        "data sharing": {"weight": 10},
        "third-party providers": {"weight": 10},
        "data retention": {"weight": 10},
        "personal information": {"weight": 5},
        "tracking technologies": {"weight": 5},
        "cookies": {"weight": 5}
    }
    #hi
}