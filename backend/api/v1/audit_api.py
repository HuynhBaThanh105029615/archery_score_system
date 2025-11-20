from fastapi import APIRouter, Depends
from app.dependencies import get_db
from db.repositories.audit_log import audit_repo

router = APIRouter()

@router.get("/")
async def list_audit_logs(db=Depends(get_db), limit: int = 100, offset: int = 0):
    params = {
        "limit": limit,
        "offset": offset,
    }
    return await db.select("audit_log", params)
