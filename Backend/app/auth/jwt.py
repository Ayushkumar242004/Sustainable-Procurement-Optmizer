from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from decouple import config

# Config
SECRET_KEY = config("SECRET_KEY")
ALGORITHM = "HS256"

# Token extractor from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_jwt_token(data: dict) -> str:
    """Create a JWT token with provided user data."""
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def decode_jwt_token(token: str) -> dict:
    """Decode and return the JWT payload."""
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
async def get_current_user_from_token(token: str = Depends(oauth2_scheme)) -> dict:
    """Get current user from JWT token - async version for FastAPI dependencies."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload is None:
            raise HTTPException(
                status_code=401, 
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        # Ensure we have required fields
        email = payload.get("email")
        if not email:
            raise HTTPException(
                status_code=401,
                detail="Token missing email",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        return payload
    except JWTError as e:
        print(f"JWT Error: {str(e)}")  # Debug logging
        raise HTTPException(
            status_code=401, 
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )