from fastapi import APIRouter
from app.database import db

router = APIRouter()

@router.get("/ping")
async def ping_db():
    # Try inserting dummy data
    await db.test.insert_one({"message": "test message"})
    return {"msg": "Connected to MongoDB"}
