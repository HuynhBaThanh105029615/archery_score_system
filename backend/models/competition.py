from pydantic import BaseModel
from datetime import date
from typing import Optional

class Competition(BaseModel):
    competition_id: int
    name: str
    date: date
    location: Optional[str]
    is_championship_part: bool
    created_by: int


class CompetitionCreate(BaseModel):
    name: str
    date: str
    location: str
    is_championship_part: bool
    created_by: int