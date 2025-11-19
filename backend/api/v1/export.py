from fastapi import APIRouter, Depends, Response, HTTPException
from fastapi.responses import PlainTextResponse
from app.dependencies import get_db
from core.auth import get_current_user, CurrentUser
from core.logging import logger

from services.repo_adapter import RepoAdapter
from services.export import ExportService

# repositories
from db.repositories import (
    score as score_repo,
    score_line as score_line_repo,
    competition as competition_repo,
    archer as archer_repo,
)

router = APIRouter()


def build_adapter():
    return RepoAdapter(
        entry_repo=None,
        score_repo=score_repo,
        round_repo=None,
        competition_repo=competition_repo,
        equivalent_repo=None,
        staging_line_repo=None,
        score_line_repo=score_line_repo,
        audit_repo=None,
        archer_repo=archer_repo,
    )



# EXPORT COMPETITION CSV
@router.get("/competition/{competition_id}", response_class=PlainTextResponse)
async def export_competition(
    competition_id: int,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    """
    Export full competition results as CSV.
    """
    adapter = build_adapter()
    exporter = ExportService(adapter)

    try:
        csv_data = await exporter.export_competition_csv(db, competition_id)
        filename = f"competition_{competition_id}_results.csv"
        return Response(
            content=csv_data,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.exception("CSV export failed: %s", e)
        raise HTTPException(500, f"Export failed: {e}")


# EXPORT PERSONAL BEST CSV
@router.get("/pb/{archer_id}", response_class=PlainTextResponse)
async def export_personal_best(
    archer_id: int,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    """
    Export PB list for one archer as CSV.
    """
    adapter = build_adapter()
    exporter = ExportService(adapter)

    try:
        csv_data = await exporter.export_pb_csv(db, archer_id)
        filename = f"archer_{archer_id}_pb.csv"
        return Response(
            content=csv_data,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.exception("PB CSV export failed: %s", e)
        raise HTTPException(500, f"Export PB failed: {e}")
