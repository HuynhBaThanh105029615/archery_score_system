from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

from app.dependencies import get_db
from core.logging import logger
from core.auth import get_current_user, CurrentUser

from services.repo_adapter import RepoAdapter

from db.repositories import (
    competition as competition_repo,
    competition_round as comp_round_repo,
    round as round_repo,
)

router = APIRouter()


# -------------------------------------------------------
# Helper
# -------------------------------------------------------
def build_adapter():
    return RepoAdapter(
        entry_repo=None,
        score_repo=None,
        round_repo=round_repo,
        competition_repo=competition_repo,
        equivalent_repo=None,
        staging_line_repo=None,
        score_line_repo=None,
        audit_repo=None,
        archer_repo=None,
    )


# -------------------------------------------------------
# Models
# -------------------------------------------------------
class CompetitionCreate(BaseModel):
    name: str
    date: str
    location: Optional[str] = None
    is_championship_part: Optional[bool] = False
    created_by: Optional[int] = None
    round_ids: Optional[List[int]] = None


class CompetitionUpdate(BaseModel):
    name: Optional[str] = None
    date: Optional[str] = None
    location: Optional[str] = None
    is_championship_part: Optional[bool] = None
    round_ids: Optional[List[int]] = None


# -------------------------------------------------------
# GET /competitions
# -------------------------------------------------------
@router.get("/")
async def list_competitions(
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    db=Depends(get_db),
    user: Optional[CurrentUser] = Depends(get_current_user)
):
    try:
        rows = await competition_repo.list(db, limit=limit, offset=offset)
        return rows
    except Exception as e:
        logger.exception("Failed to list competitions: %s", e)
        raise HTTPException(500, "Server error listing competitions")


# -------------------------------------------------------
# GET /competitions/{id}
# -------------------------------------------------------
@router.get("/{competition_id}")
async def get_competition(
    competition_id: int,
    db=Depends(get_db),
    user: Optional[CurrentUser] = Depends(get_current_user)
):
    try:
        comp = await competition_repo.get(db, competition_id)
        if not comp:
            raise HTTPException(404, "Competition not found")
    except Exception as e:
        logger.exception("Failed to fetch competition: %s", e)
        raise HTTPException(500, "Server error fetching competition")

    # Attach rounds
    try:
        rounds = await comp_round_repo.list_by_competition(db, competition_id)
    except Exception:
        rounds = []

    comp["rounds"] = rounds
    return comp


# -------------------------------------------------------
# POST /competitions
# -------------------------------------------------------
@router.post("/", status_code=201)
async def create_competition(
    payload: CompetitionCreate,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    # default assigned user
    comp_data = {
        "name": payload.name,
        "date": payload.date,
        "location": payload.location,
        "is_championship_part": payload.is_championship_part,
        "created_by": user.id,
    }

    try:
        comp_id = await competition_repo.create(db, comp_data)

        # attach rounds
        if payload.round_ids:
            for r_id in payload.round_ids:
                await comp_round_repo.create(db, {
                    "competition_id": comp_id,
                    "round_id": r_id
                })

        return {"ok": True, "competition_id": comp_id}

    except Exception as e:
        logger.exception("Failed to create competition: %s", e)
        raise HTTPException(500, "Server error creating competition")


# -------------------------------------------------------
# PUT /competitions/{id}
# -------------------------------------------------------
@router.put("/{competition_id}")
async def update_competition(
    competition_id: int,
    payload: CompetitionUpdate,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    # ensure exists
    comp = await competition_repo.get(db, competition_id)
    if not comp:
        raise HTTPException(404, "Competition not found")

    update_data = {k: v for k, v in payload.dict().items() if v is not None}

    try:
        # update basic fields
        await competition_repo.update(db, competition_id, update_data)

        # update rounds
        if payload.round_ids is not None:
            # delete old mappings
            await comp_round_repo.delete_by_competition(db, competition_id)

            # insert new
            for r_id in payload.round_ids:
                await comp_round_repo.create(db, {
                    "competition_id": competition_id,
                    "round_id": r_id
                })

        return {"ok": True}

    except Exception as e:
        logger.exception("Failed to update competition: %s", e)
        raise HTTPException(500, "Server error updating competition")


# -------------------------------------------------------
# DELETE /competitions/{id}
# -------------------------------------------------------
@router.delete("/{competition_id}")
async def delete_competition(
    competition_id: int,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    comp = await competition_repo.get(db, competition_id)
    if not comp:
        raise HTTPException(404, "Competition not found")

    try:
        await comp_round_repo.delete_by_competition(db, competition_id)
        await competition_repo.delete(db, competition_id)
        return {"ok": True}

    except Exception as e:
        logger.exception("Failed to delete competition: %s", e)
        raise HTTPException(500, "Server error deleting competition")
