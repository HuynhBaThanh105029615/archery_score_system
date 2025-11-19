from pydantic import BaseModel
from typing import Optional

class AuditLog(BaseModel):
    log_id: int
    action_type: str
    perform_by: int
    target_score_id: Optional[int] = None
    target_staging_id: Optional[int] = None
    performed_at: str               # ISO datetime
    notes: Optional[str] = None


class AuditLogCreate(BaseModel):
    action_type: str
    perform_by: int
    target_score_id: Optional[int] = None
    target_staging_id: Optional[int] = None
    performed_at: str
    notes: Optional[str] = None
