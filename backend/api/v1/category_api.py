from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_db
from db.repositories import category as category_repo
from models.category import CategoryCreate

router = APIRouter()


@router.get("/")
async def list_categories(db=Depends(get_db)):
    return await category_repo.list(db)


@router.get("/{category_id}")
async def get_category(category_id: int, db=Depends(get_db)):
    row = await category_repo.get(db, category_id)
    if not row:
        raise HTTPException(404, "Category not found")
    return row


@router.post("/", status_code=201)
async def create_category(payload: CategoryCreate, db=Depends(get_db)):
    category_id = await category_repo.create(db, payload.dict())
    return {"ok": True, "category_id": category_id}


@router.put("/{category_id}")
async def update_category(category_id: int, payload: CategoryCreate, db=Depends(get_db)):
    row = await category_repo.get(db, category_id)
    if not row:
        raise HTTPException(404, "Category not found")

    await category_repo.update(db, category_id, payload.dict())
    return {"ok": True}


@router.delete("/{category_id}")
async def delete_category(category_id: int, db=Depends(get_db)):
    row = await category_repo.get(db, category_id)
    if not row:
        raise HTTPException(404, "Category not found")

    await category_repo.delete(db, category_id)
    return {"ok": True}
