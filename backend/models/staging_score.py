from pydantic import BaseModel
from datetime import datetime


class StagingScore(BaseModel):
    staging_score_id: int
    archer_id: int
    round_id: int
    competition_id: int | None = None
    date_time_recorded: datetime
    status: str          # Draft / Submitted
    recorded_by: int

class StagingScoreCreate(BaseModel):
    archer_id: int
    round_id: int
    competition_id: int | None = None
    status: str = "Draft"
