from pydantic import BaseModel, EmailStr
from typing import Optional

class CompanyRegister(BaseModel):
    company_name: str
    email_domain: str
    industry: str
    employee_count: str
    location: str
    website: str | None = None  # optional field

class SupplierRegister(BaseModel):
    company_name: str
    email_domain: str
    industry: str

class EmployeeRegister(BaseModel):
    email: EmailStr
    password: str
    role: str  # e.g., 'admin', 'manager', 'supplier', etc.

class EmployeeLogin(BaseModel):
    email: EmailStr
    password: str