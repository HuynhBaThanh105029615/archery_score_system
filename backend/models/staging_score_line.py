from pydantic import BaseModel

class StagingScoreLine(BaseModel):
    staging_score_line_id: int
    staging_score_id: int
    end_id: int | None = None
    arrow_number: int
    arrow_score: int

class StagingScoreLineCreate(BaseModel):
    staging_score_id: int
    end_id: int | None = None
    arrow_number: int
    arrow_score: int
