from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from app.database import engine
from app.menu.router import router as menu_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(menu_router, prefix="/menu", tags=["Menu"])

@app.get("/")
def read_root():
    return {"message": "Connected to Neon."}

