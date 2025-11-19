from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict
from pydantic import BaseModel

from app.dependencies import get_db
from core.auth import get_current_user, CurrentUser
from core.security import require_roles
from core.logging import logger

from services.repo_adapter import RepoAdapter
from services.validation import ValidationService
from services.scoring import ScoringService
from services.approval import ApprovalService

# Repositories
from db.repositories import (
    staging_score as staging_repo,
    staging_score_line as staging_line_repo,
    score as score_repo,
    score_line as score_line_repo,
    round as round_repo,
    competition as comp_repo,
    equivalent_round as equiv_repo,
    audit_log as audit_repo,
    archer as archer_repo,
)

router = APIRouter()


# Helpers
def build_adapter():
    return RepoAdapter(
        entry_repo=staging_repo,
        score_repo=score_repo,
        round_repo=round_repo,
        competition_repo=comp_repo,
        equivalent_repo=equiv_repo,
        staging_line_repo=staging_line_repo,
        score_line_repo=score_line_repo,
        audit_repo=audit_repo,
        archer_repo=archer_repo,
    )

def build_services(adapter):
    validation = ValidationService(adapter)
    scoring = ScoringService(adapter)
    approval = ApprovalService(adapter, scoring, validation)
    return validation, scoring, approval


# -----------------------------
# MODEL
# -----------------------------
class StagingLinePayload(BaseModel):
    end_id: int | None = None
    arrow_number: int
    arrow_score: int


# -----------------------------
# POST /entries  (Create Staging)
# -----------------------------
@router.post("/", status_code=201)
async def create_staging(payload: Dict[str, Any], db=Depends(get_db), user: CurrentUser = Depends(get_current_user)):
    adapter = build_adapter()

    staging = payload.get("staging_score")
    lines = payload.get("lines", [])

    if not staging:
        raise HTTPException(400, "Missing staging_score")

    staging["recorded_by"] = user.id

    try:
        staging_id = await adapter.create_staging(db, staging, lines)
        return {"ok": True, "staging_id": staging_id}
    except Exception as e:
        logger.exception("Failed to create staging: %s", e)
        raise HTTPException(500, "Server error while creating staging score")


# -----------------------------
# GET /entries/{id}
# -----------------------------
@router.get("/{staging_id}")
async def get_staging(staging_id: int, db=Depends(get_db)):
    adapter = build_adapter()

    staging = await adapter.get_staging(db, staging_id)
    if not staging:
        raise HTTPException(404, "Staging score not found")

    lines = await adapter.get_staging_lines(db, staging_id)
    staging["lines"] = lines
    return staging


# -----------------------------
# POST /entries/{id}/line
# -----------------------------
@router.post("/{staging_id}/line", status_code=201)
async def add_line(staging_id: int, payload: StagingLinePayload, db=Depends(get_db), user: CurrentUser = Depends(get_current_user)):
    adapter = build_adapter()

    staging = await adapter.get_staging(db, staging_id)
    if not staging:
        raise HTTPException(404, "Staging not found")

    if staging["status"] == "Submitted":
        raise HTTPException(400, "Cannot add line after submission")

    line_data = payload.dict()
    line_data["staging_score_id"] = staging_id

    try:
        line_id = await adapter.create_staging_line(db, line_data)
        return {"ok": True, "line_id": line_id}
    except Exception as e:
        logger.exception("Failed to add staging line: %s", e)
        raise HTTPException(500, "Server error adding line")


# -----------------------------
# DELETE /entries/{id}/line/{line_id}
# -----------------------------
@router.delete("/{staging_id}/line/{line_id}")
async def delete_line(staging_id: int, line_id: int, db=Depends(get_db)):
    adapter = build_adapter()

    staging = await adapter.get_staging(db, staging_id)
    if not staging:
        raise HTTPException(404, "Staging not found")

    line = await adapter.get_staging_line(db, line_id)
    if not line or line["staging_score_id"] != staging_id:
        raise HTTPException(404, "Line not found")

    if staging["status"] == "Submitted":
        raise HTTPException(400, "Cannot delete lines after submission")

    try:
        await adapter.delete_staging_line(db, line_id)
        return {"ok": True}
    except Exception as e:
        logger.exception("Failed deleting staging line: %s", e)
        raise HTTPException(500, "Server error deleting line")


# -----------------------------
# POST /entries/{id}/submit
# -----------------------------
@router.post("/{staging_id}/submit")
async def submit_staging(staging_id: int, db=Depends(get_db)):
    adapter = build_adapter()

    staging = await adapter.get_staging(db, staging_id)
    if not staging:
        raise HTTPException(404, "Staging not found")

    if staging["status"] == "Submitted":
        return {"ok": True, "message": "Already submitted"}

    await adapter.update_staging(db, staging_id, {"status": "Submitted"})
    return {"ok": True}


# -----------------------------
# POST /entries/{id}/approve
# -----------------------------
@router.post("/{staging_id}/approve", dependencies=[Depends(require_roles("Recorder", "Admin"))])
async def approve_staging(staging_id: int, db=Depends(get_db), user: CurrentUser = Depends(require_roles("Recorder", "Admin"))):
    adapter = build_adapter()
    validation, scoring, approval = build_services(adapter)

    try:
        result = await approval.approve_staging(db, staging_id, user.id)
        return result
    except Exception as e:
        logger.exception("Failed approval: %s", e)
        raise HTTPException(500, "Approval failed")
