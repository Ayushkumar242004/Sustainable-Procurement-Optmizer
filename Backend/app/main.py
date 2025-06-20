# main.py

import os
import json
import logging
from dotenv import load_dotenv
from datetime import datetime
from typing import Dict, List, Optional, Any

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder

from app.routes import profile

# Google Gemini
import google.generativeai as genai

# PDF generation
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from fpdf import FPDF

# App internals
from app.database import db
from app.routes import test, auth, esg, recommendations, reportGeneration
from app.services.gemini_service import gemini_service

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# ------------------- FastAPI App Initialization -------------------
app = FastAPI(title="ESG Auto-Fill System", version="1.0.0")

# ------------------- Logger Setup -------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ------------------- CORS Middleware -------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------- Include Routers -------------------
app.include_router(test.router)
app.include_router(auth.router)
app.include_router(esg.router, prefix="/api")
app.include_router(recommendations.router)
app.include_router(reportGeneration.router)
app.include_router(profile.router)

# ------------------- Custom Exception Handler -------------------
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

# ------------------- Health Check Routes -------------------
@app.get("/")
async def root():
    return {"message": "ESG Auto-Fill System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/ping")
async def ping_db():
    return {"msg": "Pretend MongoDB is connected (DB removed in this version)"}

# ------------------- Supplier Endpoint -------------------
@app.get("/api/suppliers")
async def get_all_suppliers():
    try:
        cursor = db.suppliers.find({}, {"_id": 0})
        suppliers = await cursor.to_list(length=None)
        return {"suppliers": suppliers}
    except Exception as e:
        logger.exception("Error fetching suppliers")
        return {"error": str(e)}






