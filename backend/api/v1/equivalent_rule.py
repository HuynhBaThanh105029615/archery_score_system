from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_db
from db.repositories import equivalent_round as equiv_repo

router = APIRouter()


@router.get("/{class_id}/{division_id}/{round_id}")
async def get_equivalent_rule(
    class_id: int,
    division_id: int,
    round_id: int,
    db=Depends(get_db)
):
    rule = await equiv_repo.get_rule(db, class_id, division_id, round_id)
    if not rule:
        raise HTTPException(404, "Equivalent rule not found")

    return rule
