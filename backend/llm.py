from google import genai
import os
import json
import re

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def _clean_json(text: str) -> str:
    """
    Removes markdown fences and formatting issues
    so JSON parsing doesn't break.
    """
    text = text.strip()

    text = re.sub(r"^```json", "", text, flags=re.IGNORECASE)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)

    return text.strip()


def call_gemini(prompt: str) -> dict:
    """
    Calls Gemini and guarantees parsed JSON output.
    Raises clean exception if invalid.
    """

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt,
        config={
            "temperature": 0.4,
            "max_output_tokens": 900,
        }
    )

    if not response or not response.text:
        raise RuntimeError("Empty response from Gemini.")

    cleaned = _clean_json(response.text)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        raise RuntimeError("Gemini returned invalid JSON.")