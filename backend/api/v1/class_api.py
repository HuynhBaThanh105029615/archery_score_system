from fastapi import APIRouter, Depends, HTTPException
from typing import Optional

from app.dependencies import get_db
from core.auth import get_current_user, CurrentUser
from core.logging import logger

from services.repo_adapter import RepoAdapter
from db.repositories import class_model as class_repo
from models.class_model import ClassCreate

router = APIRouter()


def build_adapter():
    return RepoAdapter(
        entry_repo=None, score_repo=None, round_repo=None,
        competition_repo=None, equivalent_repo=None,
        staging_line_repo=None, score_line_repo=None, audit_repo=None,
        archer_repo=None, class_repo=class_repo
    )


@router.get("/")
async def list_classes(db=Depends(get_db)):
    return await class_repo.list(db)


@router.get("/{class_id}")
async def get_class(class_id: int, db=Depends(get_db)):
    row = await class_repo.get(db, class_id)
    if not row:
        raise HTTPException(404, "Class not found")
    return row


@router.post("/", status_code=201)
async def create_class(payload: ClassCreate, db=Depends(get_db)):
    class_id = await class_repo.create(db, payload.dict())
    return {"ok": True, "class_id": class_id}


@router.put("/{class_id}")
async def update_class(class_id: int, payload: ClassCreate, db=Depends(get_db)):
    row = await class_repo.get(db, class_id)
    if not row:
        raise HTTPException(404, "Class not found")

    await class_repo.update(db, class_id, payload.dict())
    return {"ok": True}


@router.delete("/{class_id}")
async def delete_class(class_id: int, db=Depends(get_db)):
    row = await class_repo.get(db, class_id)
    if not row:
        raise HTTPException(404, "Class not found")

    await class_repo.delete(db, class_id)
    return {"ok": True}
