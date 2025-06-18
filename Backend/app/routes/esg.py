from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request
from pydantic import BaseModel
from typing import Dict, Any
import os, json, re, logging
import requests
from dotenv import load_dotenv
from fastapi import Request
from app.database import db 
from app.services.gemini_service import gemini_service
import google.generativeai as genai
import traceback
from datetime import datetime  
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
load_dotenv()

router = APIRouter()

# ---------- MODELS ----------
class ESGInput(BaseModel):
    final_subfactor_scores: Dict[str, Dict[str, Any]]

class ESGCalculationRequest(BaseModel):
    result: Dict[str, Any]
    overall_data: Dict[str, Any]

# ---------- HELPERS ----------
def calculate_category_score(scores):
    valid_scores = [v for v in scores.values() if isinstance(v, (int, float))]
    return round(sum(valid_scores) / len(valid_scores), 2) if valid_scores else 0

# ---------- 1. EXTRACT AND PREFILL ESG DATA ----------
@router.post("/submit-esg-report")
async def submit_esg_report(file: UploadFile = File(...), email: str = Form(...)):
    allowed_extensions = ['.pdf', '.docx']
    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")

    try:
        file_content = await file.read()
        gemini = gemini_service(api_key=os.getenv("GEMINI_API_KEY"))
        result = await gemini.extract_esg_data(file_content, file.filename)

        email_domain = email.split('@')[1]
        supplier = await db.suppliers.find_one({"email_domain": email_domain})

        if not supplier:
            raise HTTPException(status_code=404, detail="Supplier not found")

        update_fields = {
            "esg_upload_result": result.get("result"),
            "esg_overall_data": result.get("overall_data"),
            "esg_upload_status": result.get("status")
        }

        await db.suppliers.update_one({"email_domain": email_domain}, {"$set": update_fields})
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


# ---------- 2. COMBINED: CALCULATE SUBFACTORS, FILL MISSING, FINAL SCORE ----------

class EmailRequest(BaseModel):
    email: str

@router.post("/calculate-and-store-esg")
async def calculate_and_store_esg_scores(request: EmailRequest):
    try:
        # 1. Email and Supplier Validation
        if not request.email or "@" not in request.email:
            raise HTTPException(status_code=422, detail="Invalid email format")
            
        email = request.email
        email_domain = email.split('@')[1]
        
        supplier = await db.suppliers.find_one({"email_domain": email_domain})
        if not supplier:
            raise HTTPException(status_code=404, detail="Supplier not found")

        if "esg_upload_result" not in supplier or "esg_overall_data" not in supplier:
            raise HTTPException(
                status_code=400, 
                detail="ESG data not found. Please upload a report first."
            )

        # 2. Prepare Gemini Input
        full_input = {
            "result": supplier["esg_upload_result"],
            "overall_data": supplier["esg_overall_data"]
        }

        # --- FORMULA PROMPT ---
        formula_prompt = f"""
You are an expert ESG analyst. Compute ESG subfactor scores using these exact formulas:

### Environmental (E) Formulas:
1. GHG Score = 100 × (1 - (GHG Emissions / 2.85))
2. Energy Score = 100 × (1 - (Energy Use / 3150))
3. Water Score = 100 × (1 - (Water Use / 3.85))
4. Waste Score = 100 × (Waste Recycled / Total Waste)
5. Compliance Score = 100 - (Environmental Fines × 7.5)
6. Renewable Score = 100 × (Renewable Energy / Total Energy)
7. Biodiversity Score = 100 - (Impact Score / 40 × 100)
8. Climate Risk Score = 100 × (Measures Implemented / 18)

### Social (S) Formulas:
1. Retention Score = 100 × (1 - (Turnover Rate / 15))
2. Safety Score = 100 × (1 - (Injury Rate / 3.85))
3. Diversity Score = 100 × (Diverse Employees / Total Employees)
4. Community Score = 100 × (Community Investment / Revenue)
5. Customer Score = Net Promoter Score (scale: -100 to +100)
6. Human Rights Score = 100 - (Violations × 15)
7. Training Score = 100 × (Training Hours / 40)

### Governance (G) Formulas:
1. Board Independence = 100 × (Independent Directors / Total)
2. Compensation Score = 100 - |(CEO Pay Ratio - 200) / 200 × 100|
3. Audit Score = 100 × (Independent Audit Members / Total)
4. Shareholder Score = 100 × (Shareholder Policies / 14)
5. Transparency Score = 100 × (Disclosed Metrics / 50)
6. Anti-Corruption = 100 - (Corruption Incidents × 20)
7. Tax Transparency = 100 × (Disclosed Jurisdictions / Total)

### Instructions:
1. Use values from "result" first
2. Fall back to "overall_data" if needed
3. Return null for unavailable data
4. Maintain this exact output structure:

{{
  "Environmental": {{
    "GHG Score": ...,
    "Energy Efficiency Score": ...,
    // All 8 environmental factors
  }},
  "Social": {{
    // All 7 social factors  
  }},
  "Governance": {{
    // All 7 governance factors
  }}
}}

Input Data:
{json.dumps(full_input, indent=2)}
"""

        # 3. Call Gemini API
        response = requests.post(
            url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            params={"key": os.getenv("GEMINI_API_KEY")},
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"role": "user", "parts": [{"text": formula_prompt}]}]
            },
            timeout=30
        )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Gemini API failed: " + response.text)

        # 4. Process Response
        reply_content = response.json()["candidates"][0]["content"]["parts"][0]["text"]

        # extract json 
        def extract_json(text: str) -> dict:
            """Robust JSON extraction from Gemini response"""
            try:
                # Try direct parse first
                return json.loads(text.strip())
            except json.JSONDecodeError:
                # Handle code fence cases
                text = text.strip()
                if text.startswith('```') and text.endswith('```'):
                    text = text[3:-3].strip()
                    if text.startswith('json'):
                        text = text[4:].strip()
                
                # Find first/last curly braces
                first_brace = text.find('{')
                last_brace = text.rfind('}')
                if first_brace != -1 and last_brace != -1:
                    return json.loads(text[first_brace:last_brace+1])
                
                raise ValueError("No valid JSON found in response")

        try:
            subfactor_scores = extract_json(reply_content)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Could not parse ESG scores from Gemini response"
            )

        # --- MISSING VALUES PROMPT ---
        missing_prompt = f"""
As an ESG expert in automotive manufacturing, fill ONLY null values in this JSON 
using 2024 industry averages. Preserve all existing values.

Industry Averages Reference:
- Environmental: Scores typically range 65-85
- Social: Scores typically range 70-90  
- Governance: Scores typically range 75-95

Return the completed JSON in this exact structure:

{json.dumps(subfactor_scores, indent=2)}
"""

        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        filled_response = model.generate_content(missing_prompt)
        filled_text = filled_response.text

        try:
            fixed_scores = extract_json(filled_text)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Could not parse completed ESG scores"
            )

        # 5. Calculate Final Scores
        E_score = calculate_category_score(fixed_scores["Environmental"])
        S_score = calculate_category_score(fixed_scores["Social"])
        G_score = calculate_category_score(fixed_scores["Governance"])
        ESG_score = round(0.4 * E_score + 0.35 * S_score + 0.25 * G_score, 2)
     
        # 6. Update Database
        await db.suppliers.update_one(
            {"email_domain": email_domain},
            {"$set": {
                "esg_subfactor_scores": fixed_scores,
                "esg_E_score": E_score,
                "esg_S_score": S_score,
                "esg_G_score": G_score,
                "esg_final_score": ESG_score,
                "last_updated": datetime.utcnow()
            }}
        )

        return {
            "final_subfactor_scores": fixed_scores,
            "E_score": E_score,
            "S_score": S_score,
            "G_score": G_score,
            "ESG_score": ESG_score
        }

    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get-esg-prefill")
async def get_esg_prefill(request: Request):
    email = request.headers.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email header is required")

    email_domain = email.split('@')[1]
    supplier = await db.suppliers.find_one({"email_domain": email_domain})

    if not supplier or "esg_upload_result" not in supplier:
        raise HTTPException(status_code=404, detail="No ESG data found")

    return {
        "status": "success",
        "result": supplier["esg_upload_result"],
        "overall_data": supplier.get("esg_overall_data", {})
    }


# #------------------- old routes we used  -------------------

# @app.post("/api/upload-esg-report")
# async def upload_esg_report(file: UploadFile = File(...) , email: str = Form(...) ):
#     allowed_extensions = ['.pdf', '.docx']
#     file_extension = os.path.splitext(file.filename)[1].lower()
    
#     if file_extension not in allowed_extensions:
#         raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")

#     try:
#         file_content = await file.read()
#         logger.info(f"Processing file: {file.filename}, size: {len(file_content)} bytes")

#         gemini = gemini_service(api_key=os.getenv("GEMINI_API_KEY", "AIzaSyBEgltUoSm5vFEvDxOd29yZ1hJ3apSYpqg"))

#         result = await gemini.extract_esg_data(file_content, file.filename)

#         logger.info(f"Extraction result: {result}")
        
#         #extracting supplier info 
#         email_domain = email.split('@')[1] 
#         supplier = await db.suppliers.find_one( { "email_domain" : email_domain })
        
#         if not supplier:
#             raise HTTPException(status_code=404, detail="Supplier not found")
        
#         update_fields = {
#             "esg_upload_result": result.get("result"),
#             "esg_overall_data": result.get("overall_data"),
#             "esg_upload_status": result.get("status")
#         }

#         await db.suppliers.update_one({"email_domain": email_domain}, {"$set": update_fields})
        
#         return result

#     except Exception as e:
#         logger.error(f"Error processing file: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

# class SubfactorCompletionRequest(BaseModel):
#     subfactor_scores: Dict[str, Dict[str, Any]]
#     overall_data: Dict[str, Any]

# @app.post("/api/complete-subfactor-scores")
# async def complete_subfactor_scores(request: SubfactorCompletionRequest):
#     subfactor_scores = request.subfactor_scores
#     overall_data = request.overall_data

#     prompt = f"""
# You are a professional ESG data analyst.

# You are given a JSON input with:
# 1. "result": ESG sub-scores under Environmental, Social, and Governance categories. Some are filled, others are null.
# 2. "overall_data": A flat dictionary of available numeric company metrics.

# Your task is to:
# - Only fill in the `null` values of `subfactor_scores` by extracting values from `overall_data` and applying relevant formula on the present overall_data based on your knowledge to calculate the missing value. If in any case one of value is missing from the formula and other value is present in the overall_data then just assume the missing average value for average car manufacturing industry and calculate the missing metirc ,
#  but dont calculate those metrics whose all the values are missing. e.g. "Total GHG emissions (in tCO2)": 45, and formula requires ndustry Average GHG Emissions per Unit Revenue also so make this second value as per the dtaa of 2024 for the car manufacturing sector, compare it with car manufacturing industrial average and calculate the missing value
# - Do NOT  assume values. If you cannot compute a value from data in `overall_data`, leave it as `null`.
# - Keep existing non-null values unchanged.

# Return a valid JSON object in the same structure as `subfactor_scores`, like:
# {{
#   "Environmental": {{
#     "Greenhouse Gas (GHG) Emissions": ...,
#     ...
#   }},
#   "Social": {{
#     ...
#   }},
#   "Governance": {{
#     ...
#   }}
# }}

# ### subfactor_scores:
# {json.dumps(subfactor_scores, indent=2)}
# ### overall_data:
# {json.dumps(overall_data, indent=2)}
# """

#     try:
#         response = requests.post(
#             url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
#             params={"key": os.getenv("GEMINI_API_KEY")},
#             headers={"Content-Type": "application/json"},
#             json={
#                 "contents": [{"parts": [{"text": prompt}]}]
#             }
#         )

#         if response.status_code != 200:
#             raise HTTPException(status_code=500, detail=f"Gemini API error: {response.text}")

#         gemini_response = response.json()
#         raw_text = gemini_response['candidates'][0]['content']['parts'][0]['text']

#         # Remove ```json ... ``` wrappers if present
#         cleaned_json = re.sub(r"^```(?:json)?\n|\n```$", "", raw_text.strip())

#         try:
#             parsed_result = json.loads(cleaned_json)
#             return {"completed_subfactor_scores": parsed_result}
#         except json.JSONDecodeError:
#             return {
#                 "raw_response": raw_text,
#                 "error": "Gemini response is not valid JSON after cleaning"
#             }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Exception occurred: {str(e)}")

# class ESGCalculationRequest(BaseModel):
#     result: Dict[str, Any]
#     overall_data: Dict[str, Any]

# @app.post("/api/calculate-esg-scores-by-formulas")
# async def calculate_esg_scores(request_data: ESGCalculationRequest):
#     full_input = {
#         "result": request_data.result,
#         "overall_data": request_data.overall_data
#     }

#     input_json = json.dumps(full_input, indent=2)

#     formula_prompt = f"""
# You are an expert ESG analyst. Your task is to compute ESG subfactor scores using the formulas below and the data provided.

# Use values in "result" directly when available. Also explore "overall_data" to derive or supplement values that are missing from "result". Do not assume values if not derivable from the data. If a score cannot be computed, leave it as null. Return **all** scores grouped under "Environmental", "Social", and "Governance", even if some are null.
# Use the formulas below to calculate the score.
# ---

# ### ESG Subfactor Score Formulas:

# **Environmental (E):**
# 1.GHG Score = 100 × (1 - (Company GHG Emissions / 2.85 (tCO2e per vehicle)))
# 2. Energy Efficiency Score = 100 × (1 - (Company Energy / 3150 (MWh per 1000 vehicles)))
# 3. Water Efficiency Score = 100 × (1 - (Company Water Withdrawal / 3.85 (m³ per vehicle)))
# 4. Waste Recycling Score = 100 × (Waste Recycled / Total Waste Generated)
# 5. Compliance Score = 100 - (Number of Environmental Fines × 7.5 (points per fine))
# 6. Renewable Energy Score = 100 × (Renewable Energy / Total Energy)
# 7. Biodiversity Score = 100 - (Impact Score / 40 (max impact points)) × 100
# 8. Climate Risk Management Score = 100 × (Measures Implemented / 18 (applicable measures))

# **Social (S):**
# 1. Retention Score = 100 × (1 - (Employee Turnover / 15 (% annually)))
# 2. Safety Score = 100 × (1 - (Injury Rate / 3.85 (incidents per 100,000 hours)))
# 3. Diversity Score = 100 × (Number of Diverse Employees / Total Employees)
# 4. Community Investment Score = 100 × (Community Investment / Total Revenue)
# 5. Customer Satisfaction Score = Net Promoter Score (NPS scale: -100 to +100)
# 6. Human Rights Score = 100 - (Reported Violations × 15 (points per violation))
# 7. Training Score = 100 × (Avg Training Hours / 40 (hours per employee per year))

# **Governance (G):**
# 1. Board Independence Score = 100 × (Independent Directors / Total Directors)
# 2. Compensation Alignment Score = 100 - |(CEO Pay Ratio - 200 (times median salary)) / 200 × 100|
# 3. Audit Committee Score = 100 × (Independent Audit Members / Total Audit Members)
# 4. Shareholder Rights Score = 100 × (Shareholder-Friendly Policies / 14 (total evaluated policies))
# 5. Transparency Score = 100 × (Disclosed ESG Metrics / 50 (total ESG metrics))
# 6. Anti-Corruption Score = 100 - (Corruption Incidents × 20 (points per incident))
# 7. Tax Transparency Score = 100 × (Disclosed Tax Jurisdictions / Total Operating Jurisdictions)

# ---

# Return the output in this format:
# {{
#   "Environmental": {{
#     "GHG Score": ...,
#     "Energy Efficiency Score": ...,
#     ...
#   }},
#   "Social": {{
#     "Retention Score": ...,
#     "Safety Score": ...,
#     ...
#   }},
#   "Governance": {{
#     "Board Independence Score": ...,
#     ...
#   }}
# }}

# ---

# ### Input JSON:
# {input_json}
# """

#     try:
#         response = requests.post(
#             url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
#             params={"key": os.getenv("GEMINI_API_KEY")},
#             headers={"Content-Type": "application/json"},
#             json={
#                 "contents": [{"role": "user", "parts": [{"text": formula_prompt}]}]
#             }
#         )

#         if response.status_code != 200:
#             raise HTTPException(status_code=500, detail="Gemini API failed: " + response.text)

#         gemini_output = response.json()
#         reply_content = gemini_output["candidates"][0]["content"]["parts"][0]["text"]

#         cleaned_json = re.sub(r"^```(?:json)?\n|\n```$", "", reply_content.strip())

#         try:
#             parsed_scores = json.loads(cleaned_json)
#             return {"subfactor_scores": parsed_scores}
#         except json.JSONDecodeError:
#             return {"raw_response": reply_content}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error calling Gemini: {str(e)}")

# import re
# class ESGSubfactorScores(BaseModel):
#     subfactor_scores: Dict[str, Dict[str, Any]]

# @app.post("/api/fill-missing-esg-sub-scores-by-industryavg")
# async def fill_missing_scores(payload: ESGSubfactorScores):
#     try:
#         # Extract just the scores
#         subfactor_scores = payload.subfactor_scores

#         # Prompt to Gemini with stringified input
#         prompt = f"""
# You are an ESG analyst with domain expertise in the car manufacturing industry.

# Below is a JSON containing ESG subfactor scores grouped under Environmental, Social, and Governance.
# Some subfactors are missing (null). Fill ONLY those null values using typical industry averages for the car manufacturing sector for the year 2024.

# Return the updated JSON where:
# - Null subfactor values are replaced with the correct average estimates.
# - Non-null values remain unchanged.
# - Output must be in valid JSON format (no explanation or surrounding text).

# JSON Input:
# {json.dumps(subfactor_scores, indent=2)}
# """

#         model = genai.GenerativeModel("gemini-1.5-flash")
#         response = model.generate_content(prompt)
#         response_text = response.text.strip()

#         # Handle code block formatting if present
#         cleaned_text = re.sub(r"^```(?:json)?\n|\n```$", "", response_text.strip())
#         try:
#             fixed_scores = json.loads(cleaned_text)
#             return {"final_subfactor_scores": fixed_scores}
#         except json.JSONDecodeError:
#             return {
#                 "raw_response": response_text,
#                 "error": "Model response is not valid JSON even after cleaning"
#             }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Gemini error: {str(e)}")
    

# from typing import Dict, Any, Optional
# import statistics



# class ESGInput(BaseModel):
#     final_subfactor_scores: Dict[str, Dict[str, Optional[float]]]  # E/S/G -> Subfactor -> Score or null

# def calculate_category_score(scores: Dict[str, Optional[float]]) -> float:
#     """Averages all non-null subfactor scores in a category"""
#     valid_scores = [v for v in scores.values() if isinstance(v, (int, float))]
#     return round(statistics.mean(valid_scores), 2) if valid_scores else 0.0

# @app.post("/api/calculate-final-esg-score")
# async def calculate_final_esg_scores(payload: ESGInput):
#     try:
#         final_subfactor_scores = payload.final_subfactor_scores

#         # Extract category scores
#         E_score = calculate_category_score(final_subfactor_scores.get("Environmental", {}))
#         S_score = calculate_category_score(final_subfactor_scores.get("Social", {}))
#         G_score = calculate_category_score(final_subfactor_scores.get("Governance", {}))

#         # Car manufacturing weights (2024 example)
#         E_weight = 0.4
#         S_weight = 0.35
#         G_weight = 0.25

#         # Final ESG Score
#         ESG_score = round(E_weight * E_score + S_weight * S_score + G_weight * G_score, 2)

#         return {
#             "E_score": E_score,
#             "S_score": S_score,
#             "G_score": G_score,
#             "ESG_score": ESG_score
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))