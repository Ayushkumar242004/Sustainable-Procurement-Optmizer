import google.generativeai as genai
from fastapi import UploadFile
import PyPDF2
import io
import json
import os
from typing import Dict, Any
import logging
import re

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class gemini_service:
    def __init__(self, api_key: str):
        try:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        except Exception as e:
            logger.error(f"Failed to initialize Gemini. Check your API key. Error: {e}")
            raise

    def extract_text_from_pdf(self, file_content: bytes) -> str:
        try:
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
            text = ""
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
            return text
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            return ""

    def _save_to_local_storage(self, filename: str, data: Dict[str, Any]):
        try:
            os.makedirs("extracted_reports", exist_ok=True)
            base_name = os.path.splitext(os.path.basename(filename))[0]
            output_file = f"extracted_reports/{base_name}_extracted.json"
            with open(output_file, 'w') as f:
                json.dump(data, f, indent=2)
            logger.info(f"Successfully saved extracted data to {output_file}")
            return output_file
        except Exception as e:
            logger.error(f"Error saving to local storage: {e}")
            return None

    def _extract_json_from_text(self, text: str) -> Dict[str, Any]:
        from json import JSONDecoder
        decoder = JSONDecoder()
        text = text.strip()
        for i in range(len(text)):
            try:
                obj, end = decoder.raw_decode(text[i:])
                return obj
            except json.JSONDecodeError:
                continue
        return {}

    async def extract_esg_data(self, file_content: bytes, filename: str) -> Dict[str, Any]:
        logger.info("Starting Gemini 1.5 Flash ESG data extraction...")
        try:
            document_text = self.extract_text_from_pdf(file_content)
            if not document_text.strip():
                raise ValueError("No text could be extracted from the document.")

            prompt = """You are an expert ESG data extraction specialist.

From the following ESG report, extract as much **numerical ESG-related data** as possible to help derive key sustainability indicators. Focus on retrieving **exact values** for the following fields **if they are directly reported**. Use this strict JSON structure and field names if available. Return your response as a JSON object containing two top-level keys: `result` and `overall_data`:
keep this json name as result. In result , must include the units of numerical values also along with value
{
  "company_name": "string",
  "reporting_year": "integer",
  "company_ghg_emissions_per_unit_revenue": "float",
  "company_energy_consumption_per_unit_output": "float", 
  "company_water_withdrawal_per_unit_output": "float",
  "amount_waste_recycled": "float",
  "total_waste_generated": "float",
  "environmental_fines_penalty_weight": "integer",
  "renewable_energy_consumption": "float",
  "total_energy_consumption": "float",
  "biodiversity_impact_score": "float",
  "climate_risk_mitigation_measures_implemented": "integer",
  "total_applicable_measures": "integer",
  "employee_turnover_rate": "float",
  "company_injury_rate": "float",
  "number_diverse_employees": "integer",
  "total_employees": "integer",
  "amount_invested_community_programs": "float",
  "total_revenue": "float",
  "net_promoter_score": "integer",
  "number_reported_violations_severity_weight": "integer",
  "avg_training_hours_per_employee": "float",
  "number_independent_directors": "integer",
  "total_number_directors": "integer",
  "ceo_pay_ratio": "float",
  "number_independent_audit_committee_members": "integer",
  "total_audit_committee_members": "integer",
  "number_shareholder_friendly_policies_implemented": "integer",
  "total_number_evaluated_policies": "integer",
  "number_disclosed_esg_metrics": "integer",
  "total_number_relevant_esg_metrics": "integer",
  "number_corruption_incidents_severity_weight": "integer",
  "number_disclosed_tax_jurisdictions": "integer",
  "total_number_operating_jurisdictions": "integer"
}

---

⚠️ If **some of the above exact metrics are missing**, still extract the following **related numerical values** from the report. These values might be present in variuos parts like scope1 scope2, etc. so just collect the numerical data and append it to teh below json structure. These can help compute the final values later via mathematical transformations.
Under `"overall_data"`, collect following numerical data even if it's not part of the fields above:
- Total GHG emissions (absolute or by region/scope)
- Total energy consumption (absolute or intensity-based)
- Total water withdrawal (absolute or intensity-based)
- Amount of recycled waste (absolute or intensity-based)
- Total waste generated (absolute or intensity-based)
- Number of environmental fines and associated penalties (absolute or intensity-based)
- Renewable vs non-renewable energy breakdown (absolute or intensity-based)
- Land use and ecosystem disruption score or impact ratings (absolute or intensity-based)
- Number of implemented vs applicable climate risk mitigation measures (absolute or intensity-based)
- Employee turnover numbers or rates (absolute or intensity-based)
- Company injury statistics or rates (absolute or intensity-based)
- Number of diverse (e.g., women, minorities) employees (absolute or intensity-based)
- Total number of employees (absolute or intensity-based)
- Amount invested in community programs or CSR (absolute or intensity-based)
- Customer satisfaction scores (e.g., NPS or equivalent) (absolute or intensity-based)
- Training hours per employee or total training hours (absolute or intensity-based)
- Number of independent directors and total board members (absolute or intensity-based)
- CEO pay and industry median CEO pay (absolute or intensity-based)
- Number and details of audit committee members (absolute or intensity-based)
- Count of shareholder-friendly policies (absolute or intensity-based)
- Number of disclosed ESG metrics (absolute or intensity-based)
- Number of reported corruption incidents and their severity (absolute or intensity-based)
- Disclosed tax jurisdictions and total jurisdictions operated (absolute or intensity-based)


Return format:
{
  "result": { ... }, 
  "overall_data": { ... }
}

ONLY return the JSON object above. Do not include explanations or extra text.

Document text:

""" + document_text

            response = self.model.generate_content(prompt)
            raw_response = response.text.strip()
            logger.info(f"Gemini raw response: {raw_response}")

            if raw_response.startswith("```json"):
                raw_response = raw_response.strip("`")  # Remove backticks
                raw_response = raw_response.lstrip("json").strip()
            elif raw_response.startswith("```"):
                raw_response = raw_response.strip("`").strip()
            
            try:
                extracted_data = json.loads(raw_response)
                if isinstance(extracted_data, dict):
                    result = extracted_data.get("result", {})
                    overall_data = extracted_data.get("overall_data", {})
                else:
                    raise ValueError("Parsed data is not a JSON object.")
            except Exception as e:
                logger.warning(f"Non-JSON response from Gemini, returning raw text. Reason: {e}")
                result = raw_response
                overall_data = {}


            
            return {
                "result": result,
                "overall_data": overall_data,
                "status": "success"
            }

        except Exception as e:
            logger.error(f"Error during extraction: {e}")
            return {
                "result": {},
                "overall_data": {},
                "error": str(e),
                "status": "error"
            }
