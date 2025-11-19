from pydantic import BaseModel

class RoundEnd(BaseModel):
    end_id: int
    range_id: int
    end_number: int


class RoundEndCreate(BaseModel):
    range_id: int
    end_number: int
