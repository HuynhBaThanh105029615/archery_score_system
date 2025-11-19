from pydantic import BaseModel
from typing import Optional

class Recorder(BaseModel):
    recorder_id: int
    name: str
    email: str
    role: str               # ENUM: Admin, Recorder
    created_at: Optional[str] = None


class RecorderCreate(BaseModel):
    name: str
    email: str
    role: str               # ENUM
