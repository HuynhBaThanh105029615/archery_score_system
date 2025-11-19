from pydantic import BaseModel
from typing import Optional

class EquivalentRound(BaseModel):
    equivalent_round_id: int
    round_id: int
    equivalent_to_round_id: int
    effective_from: str        # ISO date
    effective_to: Optional[str] = None
    class_id: Optional[int] = None
    division_id: Optional[int] = None
    score_factor: Optional[float] = None
    notes: Optional[str] = None


class EquivalentRoundCreate(BaseModel):
    round_id: int
    equivalent_to_round_id: int
    effective_from: str
    effective_to: Optional[str] = None
    class_id: Optional[int] = None
    division_id: Optional[int] = None
    score_factor: Optional[float] = None
    notes: Optional[str] = None
