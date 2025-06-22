from fastapi import APIRouter, HTTPException, Depends
from app.auth.jwt import get_current_user_from_token
from app.database import db
from app.schemas.auth_schemas import ProfileUpdate
from app.utils.serializers import serialize_mongo_document
from typing import Dict, Any

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("/me")
async def get_profile(current_user: Dict = Depends(get_current_user_from_token)):
    """Get current user profile with company information"""
    try:
        user_email = current_user.get("email") or current_user.get("sub")
        if not user_email:
            raise HTTPException(status_code=400, detail="Invalid token payload")

        # Find user in database
        user = await db.users.find_one({"email": user_email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found in database")

        user = serialize_mongo_document(user)
        
        # Extract email domain
        email_domain = user_email.split('@')[1]
        
        # Find company based on email domain and role
        company_name = "Not found"
        if user["role"].lower() == "supplier":
            company_doc = await db.suppliers.find_one({"email_domain": email_domain})
        else:
            company_doc = await db.companies.find_one({"email_domain": email_domain})
        
        if company_doc:
            company_doc = serialize_mongo_document(company_doc)
            company_name = company_doc.get("company_name", "Not found")

        profile_data = {
            "email": user_email,
            "role": user.get("role", "employee"),
            "company_name": company_name,
            "email_domain": email_domain
        }

        return {"success": True, "data": profile_data}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Profile fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching profile: {str(e)}")

@router.patch("/update")
async def update_profile(
    profile_data: ProfileUpdate,
    current_user: Dict = Depends(get_current_user_from_token)
):
    """Update user profile information"""
    try:
        user_email = current_user.get("email") or current_user.get("sub")
        if not user_email:
            raise HTTPException(status_code=400, detail="Invalid token payload")

        print(f"Attempting to update user: {user_email}")

        # First, verify user exists
        existing_user = await db.users.find_one({"email": user_email})
        if not existing_user:
            print(f"User {user_email} not found in database")
            raise HTTPException(status_code=404, detail=f"User {user_email} not found")

        print(f"Found user: {existing_user}")

        # Get only the fields that were actually provided
        update_data = profile_data.dict(exclude_unset=True)

        if not update_data:
            raise HTTPException(status_code=400, detail="No data provided for update")

        print(f"Update data: {update_data}")

        # Update user document
        result = await db.users.update_one(
            {"email": user_email},
            {"$set": update_data}
        )

        print(f"Update result: matched={result.matched_count}, modified={result.modified_count}")

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found during update operation")

        if result.modified_count == 0:
            return {"success": True, "message": "No changes made (data was identical)"}

        return {"success": True, "message": "Profile updated successfully"}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Profile update error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error updating profile: {str(e)}")
