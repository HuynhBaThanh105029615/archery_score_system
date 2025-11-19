from fastapi import APIRouter, Depends, Response, HTTPException
from fastapi.responses import PlainTextResponse

from app.dependencies import get_db
from core.auth import get_current_user, CurrentUser
from core.logging import logger

from services.repo_adapter import RepoAdapter
from services.export import ExportService

from db.repositories import (
    score as score_repo,
    score_line as score_line_repo,
    competition as competition_repo,
    archer as archer_repo,
    round as round_repo,
)

router = APIRouter()


# -------------------------------------------
# Adapter builder
# -------------------------------------------
def build_adapter():
    return RepoAdapter(
        entry_repo=None,
        score_repo=score_repo,
        round_repo=round_repo,
        competition_repo=competition_repo,
        equivalent_repo=None,
        staging_line_repo=None,
        score_line_repo=score_line_repo,
        audit_repo=None,
        archer_repo=archer_repo,
    )


# -------------------------------------------
# GET /export/competition/{id}
# -------------------------------------------
@router.get("/competition/{competition_id}", response_class=PlainTextResponse)
async def export_competition(
    competition_id: int,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    adapter = build_adapter()
    exporter = ExportService(adapter)

    try:
        csv_text = await exporter.export_competition_csv(db, competition_id)
        filename = f"competition_{competition_id}_results.csv"

        return Response(
            content=csv_text,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )

    except Exception as e:
        logger.exception("Failed to export competition CSV: %s", e)
        raise HTTPException(500, f"CSV export failed: {e}")


# -------------------------------------------
# GET /export/pb/{archer_id}
# -------------------------------------------
@router.get("/pb/{archer_id}", response_class=PlainTextResponse)
async def export_personal_best(
    archer_id: int,
    db=Depends(get_db),
    user: CurrentUser = Depends(get_current_user)
):
    adapter = build_adapter()
    exporter = ExportService(adapter)

    try:
        csv_text = await exporter.export_pb_csv(db, archer_id)
        filename = f"archer_{archer_id}_pb.csv"

        return Response(
            content=csv_text,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )

    except Exception as e:
        logger.exception("Failed to export PB CSV: %s", e)
        raise HTTPException(500, f"Export PB failed: {e}")
