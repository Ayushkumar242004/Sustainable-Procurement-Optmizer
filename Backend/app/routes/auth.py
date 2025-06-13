from fastapi import APIRouter, HTTPException, status
from app.schemas.auth_schemas import CompanyRegister, SupplierRegister, EmployeeRegister, EmployeeLogin
from app.auth.auth_handler import hash_password, verify_password
from app.auth.jwt import create_jwt_token
from app.database import db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register/company")
async def register_company(data: CompanyRegister):
    existing = await db.companies.find_one({"email_domain": data.email_domain})
    if existing:
        raise HTTPException(status_code=400, detail="Company already registered")

    await db.companies.insert_one(data.dict())
    return {"success": True, "message": "Company registered successfully"}


@router.post("/register/supplier")
async def register_supplier(data: SupplierRegister):
    existing = await db.suppliers.find_one({"email_domain": data.email_domain})
    if existing:
        raise HTTPException(status_code=400, detail="Supplier already registered")

    await db.suppliers.insert_one(data.dict())
    return {"success": True, "message": "Supplier registered successfully"}


@router.post("/register/employee")
async def register_employee(data: EmployeeRegister):
    domain = data.email.split('@')[-1]

    # Decide where to search based on role
    if data.role.lower() == "supplier":
        authorized = await db.suppliers.find_one({"email_domain": domain})
    else:
        authorized = await db.companies.find_one({"email_domain": domain})

    if not authorized:
        raise HTTPException(status_code=403, detail="Email domain not authorized")

    existing_user = await db.users.find_one({"email": data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Employee already exists")

    hashed_pw = hash_password(data.password)
    await db.users.insert_one({
        "email": data.email,
        "password": hashed_pw,
        "role": data.role
    })
    return {"success": True, "message": "Employee registered successfully"}


@router.post("/login/employee")
async def login_employee(data: EmployeeLogin):
    user = await db.users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_jwt_token({"email": user["email"], "role": user["role"]})
    return {
        "success": True,
        "token": token,
        "user": {
            "email": user["email"],
            "role": user["role"]
        },
        "message": "Login successful"
    }
