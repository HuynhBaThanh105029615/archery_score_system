from pydantic import BaseModel

class RoundRange(BaseModel):
    range_id: int
    round_id: int
    distance: int
    ends: int
    target_face_size: int


class RoundRangeCreate(BaseModel):
    round_id: int
    distance: int
    ends: int
    target_face_size: int
