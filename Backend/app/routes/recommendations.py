from fastapi import APIRouter , HTTPException
from pydantic import BaseModel
import requests
import os
import re

class GeminiRecommendationRequest(BaseModel):
    prompt: str

router = APIRouter( )

@router.post("/api/gemini-recommendations-esgScore")
async def gemini_recommendations(request: GeminiRecommendationRequest):
    """
    Accepts a prompt (should include esg_category_scores in the text), sends to Gemini, and returns improvement suggestions as points.
    """
    import re

    try:
        # Compose the prompt for Gemini
        full_prompt = (
            f"You are an expert ESG consultant. "
            f"Given the following ESG category scores, suggest actionable techniques to improve these scores. "
            f"Respond as a concise list of improvement points, each as a separate bullet:\n\n. Response everything in normal text, no bold or italic test."
            f"Give response in three different points, Environmental, Social, Governance. In these points, make subpoints which suggest improvements."
            f"Give only normal text with no bold words, no special characters."
            f"{request.prompt}"
        )

        # Use Gemini 1.5 Flash API (as in your other endpoints)
        response = requests.post(
            url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            params={"key": os.getenv("GEMINI_API_KEY")},
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"role": "user", "parts": [{"text": full_prompt}]}]
            }
        )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Gemini API failed: " + response.text)

        gemini_output = response.json()
        reply_content = gemini_output["candidates"][0]["content"]["parts"][0]["text"]

        # Split the response into points (handles bullets, numbers, or newlines)
        points = [
            p.strip("•- \n\r\t")
            for p in re.split(r"(?:\n|^)[•\-–\d.]+\s*", reply_content)
            if p.strip()
        ]

        return {"recommendations": points}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini: {str(e)}")
    
   
class GeminiRecommendationRequest(BaseModel):
    prompt: str

@router.post("/api/gemini-recommendations-eScore")
async def gemini_recommendations(request: GeminiRecommendationRequest):
    """
    Accepts a prompt (should include esg_category_scores in the text), sends to Gemini, and returns improvement suggestions as points.
    """
    import re

    try:
        # Compose the prompt for Gemini
        full_prompt = (
            f"You are an expert ESG consultant. "
            f"Given the following Environmental scores, suggest actionable techniques to improve these scores. "
            f"Respond as a concise list of improvement points, each as a separate bullet:\n\n. Response everything in normal text, no bold or italic test."
            f"Give response in three different points, Environmental, Social, Governance. In these points, make subpoints which suggest improvements."
            f"Give only normal text with no bold words, no special characters."
            f"{request.prompt}"
        )

        # Use Gemini 1.5 Flash API (as in your other endpoints)
        response = requests.post(
            url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            params={"key": os.getenv("GEMINI_API_KEY")},
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"role": "user", "parts": [{"text": full_prompt}]}]
            }
        )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Gemini API failed: " + response.text)

        gemini_output = response.json()
        reply_content = gemini_output["candidates"][0]["content"]["parts"][0]["text"]

        # Split the response into points (handles bullets, numbers, or newlines)
        points = [
            p.strip("•- \n\r\t")
            for p in re.split(r"(?:\n|^)[•\-–\d.]+\s*", reply_content)
            if p.strip()
        ]

        return {"recommendations": points}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini: {str(e)}")
    

@router.post("/api/gemini-recommendations-sScore")
async def gemini_recommendations(request: GeminiRecommendationRequest):
    """
    Accepts a prompt (should include esg_category_scores in the text), sends to Gemini, and returns improvement suggestions as points.
    """
    import re

    try:
        # Compose the prompt for Gemini
        full_prompt = (
            f"You are an expert ESG consultant. "
            f"Given the following Social scores, suggest actionable techniques to improve these scores. "
            f"Respond as a concise list of improvement points, each as a separate bullet:\n\n. Response everything in normal text, no bold or italic test."
            f"Give response in three different points, Environmental, Social, Governance. In these points, make subpoints which suggest improvements."
            f"Give only normal text with no bold words, no special characters."
            f"{request.prompt}"
        )

        # Use Gemini 1.5 Flash API (as in your other endpoints)
        response = requests.post(
            url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            params={"key": os.getenv("GEMINI_API_KEY")},
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"role": "user", "parts": [{"text": full_prompt}]}]
            }
        )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Gemini API failed: " + response.text)

        gemini_output = response.json()
        reply_content = gemini_output["candidates"][0]["content"]["parts"][0]["text"]

        # Split the response into points (handles bullets, numbers, or newlines)
        points = [
            p.strip("•- \n\r\t")
            for p in re.split(r"(?:\n|^)[•\-–\d.]+\s*", reply_content)
            if p.strip()
        ]

        return {"recommendations": points}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini: {str(e)}")
    

@router.post("/api/gemini-recommendations-gScore")
async def gemini_recommendations(request: GeminiRecommendationRequest):
    """
    Accepts a prompt (should include esg_category_scores in the text), sends to Gemini, and returns improvement suggestions as points.
    """
    import re

    try:
        # Compose the prompt for Gemini
        full_prompt = (
            f"You are an expert ESG consultant. "
            f"Given the following Governance scores, suggest actionable techniques to improve these scores. "
            f"Respond as a concise list of improvement points, each as a separate bullet:\n\n. Response everything in normal text, no bold or italic test."
            f"Give response in three different points, Environmental, Social, Governance. In these points, make subpoints which suggest improvements."
            f"Give only normal text with no bold words, no special characters."
            f"{request.prompt}"
        )

        # Use Gemini 1.5 Flash API (as in your other endpoints)
        response = requests.post(
            url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            params={"key": os.getenv("GEMINI_API_KEY")},
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"role": "user", "parts": [{"text": full_prompt}]}]
            }
        )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Gemini API failed: " + response.text)

        gemini_output = response.json()
        reply_content = gemini_output["candidates"][0]["content"]["parts"][0]["text"]

        # Split the response into points (handles bullets, numbers, or newlines)
        points = [
            p.strip("•- \n\r\t")
            for p in re.split(r"(?:\n|^)[•\-–\d.]+\s*", reply_content)
            if p.strip()
        ]

        return {"recommendations": points}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini: {str(e)}")