from fastapi import FastAPI, UploadFile, File, HTTPException, Request, Body
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List
import logging
import os
import requests
import json
from .services.gemini_service import gemini_service
# route for testing mongo connection 
from app.routes import test 
from app.routes import auth 
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="ESG Auto-Fill System", version="1.0.0")

# Logger setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

origins = [
    "http://localhost:3000",  # frontend dev server
    # Add your production domain here when deploying
]



app.include_router(test.router)
app.include_router(auth.router) 

# added middle ware for cross origin in backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)


# ------------------- Exception Handler -------------------
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation error: {exc.errors()}")
    logger.error(f"Request body: {exc.body}")
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder({
            "detail": exc.errors(),
            "body": exc.body,
            "message": "Validation failed"
        }),
    )

# ------------------- Root & Health -------------------
@app.get("/")
async def root():
    return {"message": "ESG Auto-Fill System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/ping")
async def ping_db():
    return {"msg": "Pretend MongoDB is connected (DB removed in this version)"}

# ------------------- Upload ESG Report -------------------
@app.post("/api/upload-esg-report")
async def upload_esg_report(file: UploadFile = File(...)):
    allowed_extensions = ['.pdf', '.docx']
    file_extension = os.path.splitext(file.filename)[1].lower()
    
    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")

    try:
        file_content = await file.read()
        logger.info(f"Processing file: {file.filename}, size: {len(file_content)} bytes")

        gemini = gemini_service(api_key=os.getenv("GEMINI_API_KEY", "AIzaSyBEgltUoSm5vFEvDxOd29yZ1hJ3apSYpqg"))

        result = await gemini.extract_esg_data(file_content, file.filename)

        logger.info(f"Extraction result: {result}")
        return result

    except Exception as e:
        logger.error(f"Error processing file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

class SubfactorCompletionRequest(BaseModel):
    subfactor_scores: Dict[str, Dict[str, Any]]
    overall_data: Dict[str, Any]

@app.post("/api/complete-subfactor-scores")
async def complete_subfactor_scores(request: SubfactorCompletionRequest):
    subfactor_scores = request.subfactor_scores
    overall_data = request.overall_data

    prompt = f"""
You are a professional ESG data analyst.

You are given a JSON input with:
1. "result": ESG sub-scores under Environmental, Social, and Governance categories. Some are filled, others are null.
2. "overall_data": A flat dictionary of available numeric company metrics.

Your task is to:
- Only fill in the `null` values of `subfactor_scores` by extracting values from `overall_data` and applying relevant formula on the present overall_data based on your knowledge to calculate the missing value. If in any case one of value is missing from the formula and other value is present in the overall_data then just assume the missing average value for average car manufacturing industry and calculate the missing metirc ,
 but dont calculate those metrics whose all the values are missing. e.g. "Total GHG emissions (in tCO2)": 45, and formula requires ndustry Average GHG Emissions per Unit Revenue also so make this second value as per the dtaa of 2024 for the car manufacturing sector, compare it with car manufacturing industrial average and calculate the missing value
- Do NOT  assume values. If you cannot compute a value from data in `overall_data`, leave it as `null`.
- Keep existing non-null values unchanged.

Return a valid JSON object in the same structure as `subfactor_scores`, like:
{{
  "Environmental": {{
    "Greenhouse Gas (GHG) Emissions": ...,
    ...
  }},
  "Social": {{
    ...
  }},
  "Governance": {{
    ...
  }}
}}

### subfactor_scores:
{json.dumps(subfactor_scores, indent=2)}
### overall_data:
{json.dumps(overall_data, indent=2)}
"""

    try:
        response = requests.post(
            url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            params={"key": os.getenv("GEMINI_API_KEY")},
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"parts": [{"text": prompt}]}]
            }
        )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f"Gemini API error: {response.text}")

        gemini_response = response.json()
        raw_text = gemini_response['candidates'][0]['content']['parts'][0]['text']

        # Remove ```json ... ``` wrappers if present
        cleaned_json = re.sub(r"^```(?:json)?\n|\n```$", "", raw_text.strip())

        try:
            parsed_result = json.loads(cleaned_json)
            return {"completed_subfactor_scores": parsed_result}
        except json.JSONDecodeError:
            return {
                "raw_response": raw_text,
                "error": "Gemini response is not valid JSON after cleaning"
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Exception occurred: {str(e)}")

class ESGCalculationRequest(BaseModel):
    result: Dict[str, Any]
    overall_data: Dict[str, Any]

@app.post("/api/calculate-esg-scores-by-formulas")
async def calculate_esg_scores(request_data: ESGCalculationRequest):
    full_input = {
        "result": request_data.result,
        "overall_data": request_data.overall_data
    }

    input_json = json.dumps(full_input, indent=2)

    formula_prompt = f"""
You are an expert ESG analyst. Your task is to compute ESG subfactor scores using the formulas below and the data provided.

Use values in "result" directly when available. Also explore "overall_data" to derive or supplement values that are missing from "result". Do not assume values if not derivable from the data. If a score cannot be computed, leave it as null. Return **all** scores grouped under "Environmental", "Social", and "Governance", even if some are null.
Use the formulas below to calculate the score.
---

### ESG Subfactor Score Formulas:

**Environmental (E):**
1.GHG Score = 100 × (1 - (Company GHG Emissions / 2.85 (tCO2e per vehicle)))
2. Energy Efficiency Score = 100 × (1 - (Company Energy / 3150 (MWh per 1000 vehicles)))
3. Water Efficiency Score = 100 × (1 - (Company Water Withdrawal / 3.85 (m³ per vehicle)))
4. Waste Recycling Score = 100 × (Waste Recycled / Total Waste Generated)
5. Compliance Score = 100 - (Number of Environmental Fines × 7.5 (points per fine))
6. Renewable Energy Score = 100 × (Renewable Energy / Total Energy)
7. Biodiversity Score = 100 - (Impact Score / 40 (max impact points)) × 100
8. Climate Risk Management Score = 100 × (Measures Implemented / 18 (applicable measures))

**Social (S):**
1. Retention Score = 100 × (1 - (Employee Turnover / 15 (% annually)))
2. Safety Score = 100 × (1 - (Injury Rate / 3.85 (incidents per 100,000 hours)))
3. Diversity Score = 100 × (Number of Diverse Employees / Total Employees)
4. Community Investment Score = 100 × (Community Investment / Total Revenue)
5. Customer Satisfaction Score = Net Promoter Score (NPS scale: -100 to +100)
6. Human Rights Score = 100 - (Reported Violations × 15 (points per violation))
7. Training Score = 100 × (Avg Training Hours / 40 (hours per employee per year))

**Governance (G):**
1. Board Independence Score = 100 × (Independent Directors / Total Directors)
2. Compensation Alignment Score = 100 - |(CEO Pay Ratio - 200 (times median salary)) / 200 × 100|
3. Audit Committee Score = 100 × (Independent Audit Members / Total Audit Members)
4. Shareholder Rights Score = 100 × (Shareholder-Friendly Policies / 14 (total evaluated policies))
5. Transparency Score = 100 × (Disclosed ESG Metrics / 50 (total ESG metrics))
6. Anti-Corruption Score = 100 - (Corruption Incidents × 20 (points per incident))
7. Tax Transparency Score = 100 × (Disclosed Tax Jurisdictions / Total Operating Jurisdictions)

---

Return the output in this format:
{{
  "Environmental": {{
    "GHG Score": ...,
    "Energy Efficiency Score": ...,
    ...
  }},
  "Social": {{
    "Retention Score": ...,
    "Safety Score": ...,
    ...
  }},
  "Governance": {{
    "Board Independence Score": ...,
    ...
  }}
}}

---

### Input JSON:
{input_json}
"""

    try:
        response = requests.post(
            url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            params={"key": os.getenv("GEMINI_API_KEY")},
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"role": "user", "parts": [{"text": formula_prompt}]}]
            }
        )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Gemini API failed: " + response.text)

        gemini_output = response.json()
        reply_content = gemini_output["candidates"][0]["content"]["parts"][0]["text"]

        cleaned_json = re.sub(r"^```(?:json)?\n|\n```$", "", reply_content.strip())

        try:
            parsed_scores = json.loads(cleaned_json)
            return {"subfactor_scores": parsed_scores}
        except json.JSONDecodeError:
            return {"raw_response": reply_content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini: {str(e)}")

import re
class ESGSubfactorScores(BaseModel):
    subfactor_scores: Dict[str, Dict[str, Any]]

@app.post("/api/fill-missing-esg-sub-scores-by-industryavg")
async def fill_missing_scores(payload: ESGSubfactorScores):
    try:
        # Extract just the scores
        subfactor_scores = payload.subfactor_scores

        # Prompt to Gemini with stringified input
        prompt = f"""
You are an ESG analyst with domain expertise in the car manufacturing industry.

Below is a JSON containing ESG subfactor scores grouped under Environmental, Social, and Governance.
Some subfactors are missing (null). Fill ONLY those null values using typical industry averages for the car manufacturing sector for the year 2024.

Return the updated JSON where:
- Null subfactor values are replaced with the correct average estimates.
- Non-null values remain unchanged.
- Output must be in valid JSON format (no explanation or surrounding text).

JSON Input:
{json.dumps(subfactor_scores, indent=2)}
"""

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        response_text = response.text.strip()

        # Handle code block formatting if present
        cleaned_text = re.sub(r"^```(?:json)?\n|\n```$", "", response_text.strip())
        try:
            fixed_scores = json.loads(cleaned_text)
            return {"final_subfactor_scores": fixed_scores}
        except json.JSONDecodeError:
            return {
                "raw_response": response_text,
                "error": "Model response is not valid JSON even after cleaning"
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini error: {str(e)}")
    

from typing import Dict, Any, Optional
import statistics



class ESGInput(BaseModel):
    final_subfactor_scores: Dict[str, Dict[str, Optional[float]]]  # E/S/G -> Subfactor -> Score or null

def calculate_category_score(scores: Dict[str, Optional[float]]) -> float:
    """Averages all non-null subfactor scores in a category"""
    valid_scores = [v for v in scores.values() if isinstance(v, (int, float))]
    return round(statistics.mean(valid_scores), 2) if valid_scores else 0.0

@app.post("/api/calculate-final-esg-score")
async def calculate_final_esg_scores(payload: ESGInput):
    try:
        final_subfactor_scores = payload.final_subfactor_scores

        # Extract category scores
        E_score = calculate_category_score(final_subfactor_scores.get("Environmental", {}))
        S_score = calculate_category_score(final_subfactor_scores.get("Social", {}))
        G_score = calculate_category_score(final_subfactor_scores.get("Governance", {}))

        # Car manufacturing weights (2024 example)
        E_weight = 0.4
        S_weight = 0.35
        G_weight = 0.25

        # Final ESG Score
        ESG_score = round(E_weight * E_score + S_weight * S_score + G_weight * G_score, 2)

        return {
            "E_score": E_score,
            "S_score": S_score,
            "G_score": G_score,
            "ESG_score": ESG_score
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
