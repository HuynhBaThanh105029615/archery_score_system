from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_db
from db.repositories import competition as comp_repo, score as score_repo

router = APIRouter()

@router.get("/")
async def leaderboard_overall(db=Depends(get_db)):
    return await score_repo.get_global_leaderboard(db)


@router.get("/{competition_id}")
async def leaderboard_competition(competition_id: int, db=Depends(get_db)):
    return await score_repo.get_competition_leaderboard(db, competition_id)


@router.get("/pb/{archer_id}")
async def personal_best(archer_id: int, db=Depends(get_db)):
    return await score_repo.get_personal_best(db, archer_id)
