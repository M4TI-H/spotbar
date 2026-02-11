from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.database import engine, get_session
from pydantic import BaseModel

router = APIRouter()


