# models/score.py
from pydantic import BaseModel
from typing import Optional


class Score(BaseModel):
    score_id: int
    archer_id: int
    competition_id: Optional[int] = None
    date: str
    total: int
    is_practice: bool
    is_approved: bool
    round_id: int
    approved_by: Optional[int] = None
    division_id: Optional[int] = None
    created_at: Optional[str] = None
    equivalent_total: Optional[float] = None


class ScoreCreate(BaseModel):
    archer_id: int
    competition_id: Optional[int] = None
    date: str
    total: int
    is_practice: bool
    is_approved: bool
    round_id: int
    approved_by: Optional[int] = None
    division_id: Optional[int] = None
    equivalent_total: Optional[float] = None
