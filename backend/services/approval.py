# services/approval.py

from typing import Any, Dict
from services.validation import ValidationService
from services.scoring import ScoringService


class ApprovalError(Exception):
    pass


class ApprovalService:
    def __init__(self, repo):
        self.repo = repo
        self.validator = ValidationService(repo)
        self.scoring = ScoringService(repo)

    async def approve(self, db, staging_id: int, recorder_id: int) -> Dict:
        """
        Full approval pipeline:
          1. Load staging
          2. Validate
          3. Compute totals
          4. Create official score
          5. Update staging status
          6. Audit log
        """
        # 1) load staging
        staging = await self.repo.get_staging(db, staging_id)
        if not staging:
            raise ApprovalError("Staging not found")

        if staging.get("status", "").lower() != "submitted":
            raise ApprovalError("Only submitted entries can be approved")

        # 2) load lines
        lines = await self.repo.get_staging_lines(db, staging_id)

        # 3) validate
        valid, errors, totals = await self.validator.validate_staging(db, staging_id)
        if not valid:
            msg = "; ".join([e.message for e in errors])
            raise ApprovalError(f"Validation failed: {msg}")

        # 4) compute totals
        totals = await self.scoring.compute_totals(
            db=db,
            round_id=staging["round_id"],
            lines=lines,
            archer_id=staging["archer_id"],
        )

        # 5) create official score
        official_score = await self.repo.create_official_score(
            db=db,
            row={
                "archer_id": staging["archer_id"],
                "round_id": staging["round_id"],
                "competition_id": staging["competition_id"],
                "total": totals["total"],
                "equivalent_total": totals["equivalent_total"],
                "is_approved": True,
                "approved_by": recorder_id,
            },
            lines=lines,
        )

        # 6) update staging status
        await self.repo.entry.update_status(db, staging_id, "Approved")

        # 7) audit log
        await self.repo.insert_audit(
            db=db,
            action_type="APPROVE",
            performed_by=recorder_id,
            target_staging_id=staging_id,
            target_score_id=official_score,
        )

        return {"score_id": official_score}
