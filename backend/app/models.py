from sqlmodel import SQLModel, Field

class Test(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    text: str
    number: int
