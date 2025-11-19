from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional

from app.dependencies import get_db
from core.auth import get_current_user, CurrentUser
from core.logging import logger

from db.repositories import (
    round as round_repo,
    round_range as range_repo,
    round_end as end_repo,
)

router = APIRouter()


# GET /rounds
@router.get("/")
async def list_rounds(
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    db=Depends(get_db)
):
    return await round_repo.list(db, limit=limit, offset=offset)


# GET /rounds/{id}
@router.get("/{round_id}")
async def get_round(round_id: int, db=Depends(get_db)):
    row = await round_repo.get(db, round_id)
    if not row:
        raise HTTPException(404, "Round not found")
    return row


# GET /rounds/{id}/ranges
@router.get("/{round_id}/ranges")
async def get_round_ranges(round_id: int, db=Depends(get_db)):
    return await range_repo.list_by_round(db, round_id)


# GET /rounds/{id}/ranges/{range_id}/ends
@router.get("/{round_id}/ranges/{range_id}/ends")
async def get_round_range_ends(round_id: int, range_id: int, db=Depends(get_db)):
    return await end_repo.list_by_range(db, range_id)
