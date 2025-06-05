from pydantic import BaseModel, EmailStr, Field

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegistrationRequest(BaseModel):
    company_name: str
    industry: str
    location: str
    employee_count: int = Field(..., ge=1)
    fullname: str
    email: EmailStr
    password: str
    role: str  