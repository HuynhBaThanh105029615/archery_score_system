from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_db
from core.auth import get_current_user, CurrentUser
from core.logging import logger

from services.repo_adapter import RepoAdapter
from services.validation import ValidationService

from db.repositories import (
    staging_score as staging_repo,
    staging_score_line as staging_line_repo,
    round as round_repo,
    audit_log as audit_repo,
)

router = APIRouter()

def build_adapter():
    return RepoAdapter(
        entry_repo=staging_repo,
        score_repo=None,
        round_repo=round_repo,
        competition_repo=None,
        equivalent_repo=None,
        staging_line_repo=staging_line_repo,
        score_line_repo=None,
        audit_repo=audit_repo,
        archer_repo=None,
    )

@router.post("/staging/{staging_id}")
async def validate_staging(staging_id: int, db=Depends(get_db), user: CurrentUser = Depends(get_current_user)):
    adapter = build_adapter()
    validation = ValidationService(adapter)

    try:
        valid, errors, totals = await validation.validate_staging(db, staging_id)
        return {
            "valid": valid,
            "errors": [e.dict() for e in errors],
            "totals": totals
        }
    except Exception as e:
        logger.exception("Validation failed: %s", e)
        raise HTTPException(500, "Validation error")
