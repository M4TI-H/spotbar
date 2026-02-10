from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.database import engine, get_session
from app.models import Test
from pydantic import BaseModel

router = APIRouter()

class FormData(BaseModel):
    text: str
    number: int


@router.post("/test-submit")
async def handle_submit(data: FormData, session: Session = Depends(get_session)):
    entry = Test(
        text = data.text,
        number = data.number
    )
    session.add(entry)
    session.commit()
    session.refresh(entry)