from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_db
from db.repositories import division as division_repo
from models.division import DivisionCreate

router = APIRouter()


@router.get("/")
async def list_divisions(db=Depends(get_db)):
    return await division_repo.list(db)


@router.get("/{division_id}")
async def get_division(division_id: int, db=Depends(get_db)):
    row = await division_repo.get(db, division_id)
    if not row:
        raise HTTPException(404, "Division not found")
    return row


@router.post("/", status_code=201)
async def create_division(payload: DivisionCreate, db=Depends(get_db)):
    division_id = await division_repo.create(db, payload.dict())
    return {"ok": True, "division_id": division_id}


@router.put("/{division_id}")
async def update_division(division_id: int, payload: DivisionCreate, db=Depends(get_db)):
    row = await division_repo.get(db, division_id)
    if not row:
        raise HTTPException(404, "Division not found")

    await division_repo.update(db, division_id, payload.dict())
    return {"ok": True}


@router.delete("/{division_id}")
async def delete_division(division_id: int, db=Depends(get_db)):
    row = await division_repo.get(db, division_id)
    if not row:
        raise HTTPException(404, "Division not found")

    await division_repo.delete(db, division_id)
    return {"ok": True}
