import bcrypt

def hash_password(password: str) -> str:
    #Hash the plain password using bcrypt.
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    #Verify the plain password against the hashed password.
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
