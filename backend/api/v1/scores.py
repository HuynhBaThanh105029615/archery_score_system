from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

from app.dependencies import get_db
from core.auth import get_current_user, CurrentUser
from core.logging import logger

from services.repo_adapter import RepoAdapter
from services.scoring import ScoringService

from db.repositories import (
    score as score_repo,
    score_line as score_line_repo,
    archer as archer_repo,
)

router = APIRouter()


# Adapter builder
def build_adapter():
    return RepoAdapter(
        entry_repo=None,
        score_repo=score_repo,
        round_repo=None,
        competition_repo=None,
        equivalent_repo=None,
        staging_line_repo=None,
        score_line_repo=score_line_repo,
        audit_repo=None,
        archer_repo=archer_repo,
    )


def build_services(adapter):
    return ScoringService(adapter)


# ------------------------
# Request Model
# ------------------------
class EditScoreLinePayload(BaseModel):
    line_id: int
    arrow_number: int
    arrow_score: int
    note: Optional[str] = None


# ------------------------
# GET /scores
# ------------------------
@router.get("/")
async def list_scores(
    competition_id: Optional[int] = Query(None),
    archer_id: Optional[int] = Query(None),
    round_id: Optional[int] = Query(None),
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    db=Depends(get_db),
):
    params = {"limit": limit, "offset": offset}

    if competition_id:
        params["competition_id"] = f"eq.{competition_id}"
    if archer_id:
        params["archer_id"] = f"eq.{archer_id}"
    if round_id:
        params["round_id"] = f"eq.{round_id}"

    try:
        rows = await db.select("score", params=params)
        return rows
    except Exception as e:
        logger.exception("Failed to list scores: %s", e)
        raise HTTPException(500, "Server error listing scores")


# ------------------------
# GET /scores/{id}
# ------------------------
@router.get("/{score_id}")
async def get_score(score_id: int, db=Depends(get_db)):
    adapter = build_adapter()

    score = await adapter.score.get(db, score_id)
    if not score:
        raise HTTPException(404, "Score not found")

    lines = await adapter.score_line.list_by_score(db, score_id)
    score["lines"] = lines

    # attach archer data
    try:
        ar = await adapter.archer.get(db, score["archer_id"])
        if ar:
            score["archer_name"] = ar.get("name")
    except:
        pass

    return score


# ------------------------
# POST /scores/{id}/edit
# ------------------------
@router.post("/{score_id}/edit")
async def edit_score_line(
    score_id: int,
    payload: EditScoreLinePayload,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    adapter = build_adapter()

    # ensure score exists
    score = await adapter.score.get(db, score_id)
    if not score:
        raise HTTPException(404, "Score not found")

    # ensure line exists
    line = await adapter.score_line.get(db, payload.line_id)
    if not line or line["score_id"] != score_id:
        raise HTTPException(404, "Score line not found")

    update_data = {
        "arrow_number": payload.arrow_number,
        "arrow_score": payload.arrow_score,
        "note": payload.note,
    }

    try:
        await adapter.score_line.update(db, payload.line_id, update_data)
    except Exception as e:
        logger.exception("Failed updating score line: %s", e)
        raise HTTPException(500, "Update failed")

    # recompute total
    lines = await adapter.score_line.list_by_score(db, score_id)
    new_total = sum(l["arrow_score"] for l in lines)

    await adapter.score.update(db, score_id, {"total": new_total})

    return {"ok": True, "new_total": new_total}


# ------------------------
# POST /scores/recalculate/{id}
# ------------------------
@router.post("/recalculate/{score_id}")
async def recalc_score(score_id: int, db=Depends(get_db)):
    adapter = build_adapter()
    scoring = build_services(adapter)

    score = await adapter.score.get(db, score_id)
    if not score:
        raise HTTPException(404, "Score not found")

    lines = await adapter.score_line.list_by_score(db, score_id)

    if not lines:
        raise HTTPException(400, "Score has no lines")

    try:
        new_total = await scoring.recalculate_official_score(db, score_id, lines)
    except Exception as e:
        logger.exception("Error recalculating score: %s", e)
        raise HTTPException(500, "Recalculation error")

    return {
        "ok": True,
        "score_id": score_id,
        "new_total": new_total,
    }
