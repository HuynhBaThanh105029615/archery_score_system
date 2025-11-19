from pydantic import BaseModel

class CompetitionRound(BaseModel):
    competition_round_id: int
    competition_id: int
    round_id: int


class CompetitionRoundCreate(BaseModel):
    competition_id: int
    round_id: int
