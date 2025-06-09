from fastapi import APIRouter, HTTPException, status
from app.database import db
from app.auth.jwt import create_jwt_token
from app.auth.auth_handler import hash_password, verify_password
from app.schemas.auth_schemas import LoginRequest , RegistrationRequest
router = APIRouter()

# ----- ROUTES -----

@router.post("/login")
async def login_user(credentials: LoginRequest):
    user = await db.users.find_one({"email": credentials.email})

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email")

    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_jwt_token({
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user.get("role", "user")
    })

    return {"access_token": token, "token_type": "bearer"}


@router.post("/register")
async def register_user(data: RegistrationRequest):
    existing_user = await db.users.find_one({"email": data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = {
        "company_name": data.company_name,
        "industry": data.industry,
        "location": data.location,
        "employee_count": data.employee_count,
        "fullname": data.fullname,
        "email": data.email,
        "password": hash_password(data.password),
        "role": data.role
    }

    result = await db.users.insert_one(user)

    token = create_jwt_token({
        "sub": str(result.inserted_id),
        "email": data.email,
        "role": data.role
    })

    return {
        "message": "Registration successful",
        "access_token": token,
        "token_type": "bearer"
    }
