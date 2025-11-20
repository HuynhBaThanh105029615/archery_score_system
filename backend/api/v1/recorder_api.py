from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_db
from db.repositories.recorder import recorder_repo
from models.recorder import RecorderCreate, RecorderUpdate

router = APIRouter()

@router.get("/")
async def list_recorders(db=Depends(get_db)):
    return await recorder_repo.list(db)

@router.get("/{recorder_id}")
async def get_recorder(recorder_id: int, db=Depends(get_db)):
    row = await recorder_repo.get(db, recorder_id)
    if not row:
        raise HTTPException(404, "Recorder not found")
    return row

@router.post("/", status_code=201)
async def create_recorder(payload: RecorderCreate, db=Depends(get_db)):
    new_id = await recorder_repo.create(db, payload.dict())
    return { "ok": True, "id": new_id }

@router.put("/{recorder_id}")
async def update_recorder(recorder_id: int, payload: RecorderUpdate, db=Depends(get_db)):
    existing = await recorder_repo.get(db, recorder_id)
    if not existing:
        raise HTTPException(404, "Recorder not found")

    await recorder_repo.update(db, recorder_id, payload.dict())
    return { "ok": True }

@router.delete("/{recorder_id}")
async def delete_recorder(recorder_id: int, db=Depends(get_db)):
    existing = await recorder_repo.get(db, recorder_id)
    if not existing:
        raise HTTPException(404, "Recorder not found")

    await recorder_repo.delete(db, recorder_id)
    return { "ok": True }
