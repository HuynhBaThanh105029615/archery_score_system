from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional, Dict, Any

from app.dependencies import get_db
from core.auth import get_current_user, CurrentUser
from core.logging import logger
from services.repo_adapter import RepoAdapter

# Repo
from db.repositories import archer as archer_repo
from models.archer import ArcherCreate

router = APIRouter()


# -----------------------------
# Build Adapter
# -----------------------------
def build_adapter():
    return RepoAdapter(
        entry_repo=None,
        score_repo=None,
        round_repo=None,
        competition_repo=None,
        equivalent_repo=None,
        staging_line_repo=None,
        score_line_repo=None,
        audit_repo=None,
        archer_repo=archer_repo,
    )


# -----------------------------
# GET /archers
# -----------------------------
@router.get("/")
async def list_archers(
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    db=Depends(get_db),
    user: Optional[CurrentUser] = Depends(get_current_user)
):
    adapter = build_adapter()

    try:
        rows = await adapter.archer.list(db, limit=limit, offset=offset)
        return rows
    except Exception as e:
        logger.exception("Failed to list archers: %s", e)
        raise HTTPException(500, "Server error listing archers")


# -----------------------------
# GET /archers/{id}
# -----------------------------
@router.get("/{archer_id}")
async def get_archer(
    archer_id: int,
    db=Depends(get_db),
    user: Optional[CurrentUser] = Depends(get_current_user)
):
    adapter = build_adapter()

    try:
        row = await adapter.archer.get(db, archer_id)
        if not row:
            raise HTTPException(404, "Archer not found")
        return row

    except Exception as e:
        logger.exception("Failed to fetch archer: %s", e)
        raise HTTPException(500, "Server error getting archer")


# -----------------------------
# POST /archers
# -----------------------------
@router.post("/", status_code=201)
async def create_archer(
    payload: ArcherCreate,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    adapter = build_adapter()

    try:
        archer_id = await adapter.archer.create(db, payload.dict())
        return {"ok": True, "archer_id": archer_id}

    except Exception as e:
        logger.exception("Failed to create archer: %s", e)
        raise HTTPException(500, "Server error creating archer")


# -----------------------------
# PUT /archers/{id}
# -----------------------------
@router.put("/{archer_id}")
async def update_archer(
    archer_id: int,
    payload: ArcherCreate,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    adapter = build_adapter()

    row = await adapter.archer.get(db, archer_id)
    if not row:
        raise HTTPException(404, "Archer not found")

    try:
        await adapter.archer.update(db, archer_id, payload.dict())
        return {"ok": True}
    except Exception as e:
        logger.exception("Failed to update archer: %s", e)
        raise HTTPException(500, "Server error updating archer")


# -----------------------------
# DELETE /archers/{id}
# -----------------------------
@router.delete("/{archer_id}")
async def delete_archer(
    archer_id: int,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    adapter = build_adapter()

    row = await adapter.archer.get(db, archer_id)
    if not row:
        raise HTTPException(404, "Archer not found")

    try:
        await adapter.archer.delete(db, archer_id)
        return {"ok": True}
    except Exception as e:
        logger.exception("Failed to delete archer: %s", e)
        raise HTTPException(500, "Server error deleting archer")
