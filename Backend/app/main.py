from fastapi import FastAPI

# route for testing mongo connection 
from app.routes import test 
from app.routes import auth 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(test.router)
app.include_router(auth.router) 

# added middle ware for cross origin in backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)