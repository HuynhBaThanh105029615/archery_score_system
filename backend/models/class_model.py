from pydantic import BaseModel

class Class(BaseModel):
    class_id: int
    name: str

class ClassCreate(BaseModel):
    name: str
