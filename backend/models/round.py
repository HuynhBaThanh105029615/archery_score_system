from pydantic import BaseModel
from typing import Optional

class Round(BaseModel):
    round_id: int
    name: str
    description: Optional[str] = None


class RoundCreate(BaseModel):
    name: str
    description: Optional[str] = None
