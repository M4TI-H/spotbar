import os
from dotenv import load_dotenv
from sqlmodel import create_engine, Session

load_dotenv()

database_url = os.environ.get("DATABASE_URL")

if not database_url:
    raise RuntimeError("DATABASE_URL is not set in .env file")

engine = create_engine(database_url, echo=True)


def get_session():
    with Session(engine) as session:
        yield session