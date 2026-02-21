RED_FLAG_KEYWORDS = {

    # -----------------------------------
    # Interest & Rate Risk
    # -----------------------------------
    "interest_terms": {

        "variable interest": {
            "weight": 20,
            "explanation": "The interest rate can change over time, which may increase your payments."
        },

        "adjustable rate": {
            "weight": 20,
            "explanation": "The rate may adjust periodically, potentially increasing the amount you owe."
        },

        "variable apr": {
            "weight": 20,
            "explanation": "Your annual percentage rate can fluctuate, affecting total repayment cost."
        },

        "penalty apr": {
            "weight": 25,
            "explanation": "A higher interest rate may apply if you miss payments or violate terms."
        },

        "default interest": {
            "weight": 25,
            "explanation": "A higher interest rate may apply if you default on the agreement."
        },

        "compound interest": {
            "weight": 15,
            "explanation": "Interest may be charged on previously accumulated interest, increasing total cost."
        },

        "deferred interest": {
            "weight": 25,
            "explanation": "Interest may be added later if certain conditions are not met, leading to a large balance increase."
        },

        "accrued interest": {
            "weight": 10,
            "explanation": "Interest accumulates over time and increases the total amount owed."
        },

        "daily periodic rate": {
            "weight": 15,
            "explanation": "Interest may be calculated daily, which can increase total repayment."
        },

        "finance charge": {
            "weight": 15,
            "explanation": "Additional borrowing costs beyond the principal amount may apply."
        },

        "teaser rate": {
            "weight": 20,
            "explanation": "A low introductory rate may increase significantly after a short period."
        },

        "promotional apr": {
            "weight": 15,
            "explanation": "A temporary lower rate may apply initially but increase later."
        },

        "introductory rate": {
            "weight": 15,
            "explanation": "The starting interest rate may rise after the introductory period ends."
        },

        "rate subject to change": {
            "weight": 20,
            "explanation": "The lender can modify the interest rate under certain conditions."
        }
    },


    # -----------------------------------
    # Fees & Direct Charges
    # -----------------------------------
    "fees_and_penalties": {

        "late fee": {
            "weight": 10,
            "explanation": "You may be charged extra if a payment is missed."
        },

        "processing fee": {
            "weight": 10,
            "explanation": "An administrative fee may be added for handling transactions."
        },

        "service charge": {
            "weight": 10,
            "explanation": "Recurring or additional service costs may apply."
        },

        "administrative fee": {
            "weight": 10,
            "explanation": "Extra charges may apply for administrative tasks."
        },

        "origination fee": {
            "weight": 15,
            "explanation": "You may pay a fee to initiate the loan or agreement."
        },

        "annual fee": {
            "weight": 15,
            "explanation": "A yearly charge may apply regardless of usage."
        },

        "cancellation fee": {
            "weight": 15,
            "explanation": "You may be charged for ending the agreement."
        },

        "early termination fee": {
            "weight": 25,
            "explanation": "Ending the contract early may result in a significant penalty."
        },

        "pre-payment penalty": {
            "weight": 25,
            "explanation": "You may be charged for paying off the balance early."
        },

        "non-refundable": {
            "weight": 20,
            "explanation": "Certain payments cannot be recovered once made."
        },

        "collection costs": {
            "weight": 20,
            "explanation": "You may be responsible for costs associated with debt collection."
        },

        "attorney’s fees": {
            "weight": 20,
            "explanation": "You may be required to pay the other party’s legal expenses."
        },

        "liquidated damages": {
            "weight": 25,
            "explanation": "A predetermined financial penalty may apply if you breach the agreement."
        },

        "over-the-limit fee": {
            "weight": 15,
            "explanation": "Charges may apply if you exceed a spending limit."
        },

        "cash advance fee": {
            "weight": 15,
            "explanation": "Withdrawing cash may trigger additional charges."
        },

        "foreign transaction fee": {
            "weight": 10,
            "explanation": "Extra charges may apply for international transactions."
        },

        "reinstatement fee": {
            "weight": 10,
            "explanation": "A fee may apply to restore a suspended account or agreement."
        },

        "balloon payment": {
            "weight": 30,
            "explanation": "A large lump-sum payment may be due at the end of the term."
        }
    },


    # -----------------------------------
    # Termination & Lock-In Risk
    # -----------------------------------
    "termination_and_lockin": {

        "automatic renewal": {
            "weight": 15,
            "explanation": "The agreement may renew automatically unless canceled."
        },

        "recurring billing": {
            "weight": 15,
            "explanation": "Charges may repeat on a regular schedule."
        },

        "automatic debit": {
            "weight": 20,
            "explanation": "Payments may be withdrawn automatically from your account."
        },

        "termination for convenience": {
            "weight": 20,
            "explanation": "The other party may end the agreement at their discretion."
        },

        "notice period": {
            "weight": 10,
            "explanation": "You must give advance notice before canceling."
        },

        "irrevocable": {
            "weight": 25,
            "explanation": "The agreement cannot be reversed once accepted."
        },

        "non-cancellable": {
            "weight": 25,
            "explanation": "You may not be able to cancel the agreement once signed."
        },

        "exclusive agreement": {
            "weight": 15,
            "explanation": "You may be restricted from working with competitors."
        },

        "sublease restriction": {
            "weight": 15,
            "explanation": "You may not be allowed to sublet the property."
        }
    },


    # -----------------------------------
    # Legal Rights & Dispute Resolution
    # -----------------------------------
    "legal_rights_and_dispute": {

        "binding arbitration": {
            "weight": 30,
            "explanation": "Disputes must be resolved through arbitration instead of court."
        },

        "arbitration clause": {
            "weight": 30,
            "explanation": "You may waive your right to sue in court."
        },

        "waiver of jury trial": {
            "weight": 30,
            "explanation": "You give up the right to have disputes decided by a jury."
        },

        "class action waiver": {
            "weight": 30,
            "explanation": "You may not join others in a collective lawsuit."
        },

        "governing law": {
            "weight": 5,
            "explanation": "The agreement specifies which state's or country's laws apply."
        },

        "jurisdiction": {
            "weight": 5,
            "explanation": "Disputes must be handled in a specified location."
        },

        "venue": {
            "weight": 5,
            "explanation": "Legal proceedings may be restricted to a particular court."
        },

        "entire agreement": {
            "weight": 5,
            "explanation": "Only written terms in this document are legally binding."
        },

        "amendment without notice": {
            "weight": 20,
            "explanation": "The other party may change terms without informing you."
        },

        "force majeure": {
            "weight": 10,
            "explanation": "Certain events may excuse the other party from fulfilling obligations."
        }
    },


    # -----------------------------------
    # Liability & Financial Exposure
    # -----------------------------------
    "liability_and_financial_exposure": {

        "indemnify": {
            "weight": 20,
            "explanation": "You may have to compensate the other party for losses or claims."
        },

        "indemnification": {
            "weight": 20,
            "explanation": "You may be legally responsible for covering certain damages."
        },

        "hold harmless": {
            "weight": 20,
            "explanation": "You may waive the right to hold the other party responsible."
        },

        "limitation of liability": {
            "weight": 25,
            "explanation": "The other party limits how much they can be held responsible for."
        },

        "personal guarantee": {
            "weight": 30,
            "explanation": "You may be personally liable for debts, even beyond the business entity."
        },

        "confession of judgment": {
            "weight": 30,
            "explanation": "You may allow the other party to obtain a judgment without a court trial."
        },

        "lien": {
            "weight": 25,
            "explanation": "The other party may claim rights over your property until debt is paid."
        },

        "collateral": {
            "weight": 20,
            "explanation": "You may have to pledge property as security for the agreement."
        },

        "secured interest": {
            "weight": 25,
            "explanation": "The lender may have legal rights to seize pledged assets."
        },

        "repossession": {
            "weight": 25,
            "explanation": "Property may be taken if payments are missed."
        }
    },


    # -----------------------------------
    # Data & Privacy Risk
    # -----------------------------------
    "data_and_privacy": {

        "data sharing": {
            "weight": 10,
            "explanation": "Your information may be shared with third parties."
        },

        "third-party providers": {
            "weight": 10,
            "explanation": "External companies may have access to your data."
        },

        "data retention": {
            "weight": 10,
            "explanation": "Your information may be stored for an extended period."
        },

        "personal information": {
            "weight": 5,
            "explanation": "The agreement involves collection of personal data."
        },

        "tracking technologies": {
            "weight": 5,
            "explanation": "Tracking tools may monitor user behavior."
        },

        "cookies": {
            "weight": 5,
            "explanation": "The service may store tracking cookies on your device."
        }
    }
}