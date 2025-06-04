from fastapi import FastAPI

# route for testing mongo connection 
from app.routes import test 
from app.routes import auth 

app = FastAPI()
app.include_router(test.router)
app.include_router(auth.router) 
