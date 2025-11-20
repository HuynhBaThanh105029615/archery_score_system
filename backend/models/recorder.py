from pydantic import BaseModel
from typing import Optional

class RecorderBase(BaseModel):
    name: str
    email: str
    role: str   # "admin" / "recorder"

class RecorderCreate(RecorderBase):
    pass

class RecorderUpdate(BaseModel):
    name: Optional[str]
    email: Optional[str]
    role: Optional[str]
