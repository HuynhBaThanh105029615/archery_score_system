from pydantic import BaseModel

class Division(BaseModel):
    division_id: int
    name: str

class DivisionCreate(BaseModel):
    name: str