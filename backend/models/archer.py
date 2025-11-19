from pydantic import BaseModel
from typing import Optional

class Archer(BaseModel):
    archer_id: int
    class_id: int
    default_division_id: int
    name: str
    date_of_birth: Optional[str] = None  # Supabase returns ISO string
    gender: Optional[str] = None
    user_id: int


class ArcherCreate(BaseModel):
    class_id: int
    default_division_id: int
    name: str
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    user_id: int
