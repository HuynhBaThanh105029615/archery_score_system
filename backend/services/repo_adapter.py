class RepoAdapter:
    def __init__(
        self,
        entry_repo,
        score_repo,
        round_repo,
        competition_repo,
        equivalent_repo,
        staging_line_repo,
        score_line_repo,
        audit_repo,
        archer_repo=None,
    ):
        self.entry = entry_repo
        self.score = score_repo
        self.round = round_repo
        self.competition = competition_repo
        self.equivalent = equivalent_repo
        self.staging_line = staging_line_repo
        self.score_line = score_line_repo
        self.audit = audit_repo
        self.archer = archer_repo 


    #  STAGING
    async def create_staging(self, db, staging_row: dict, lines: list[dict]):
        """Insert into staging_score + staging_score_line"""
        created = await self.entry.create(db, staging_row)
        staging_id = created[0]["staging_score_id"]

        for line in lines:
            await self.staging_line.create(db, {
                "staging_score_id": staging_id,
                "end_id": line["end_id"],
                "arrow_number": line["arrow_number"],
                "arrow_score": line["arrow_score"],
            })

        return staging_id
    
    async def create_staging_line(self, db, line_data):
        return await self.staging_line_repo.create(db, line_data)

    async def get_staging_line(self, db, line_id):
        return await self.staging_line_repo.get(db, line_id)

    async def delete_staging_line(self, db, line_id):
        return await self.staging_line_repo.delete(db, line_id)



    async def get_staging(self, db, staging_id: int):
        return await self.entry.get_by_id(db, staging_id)


    async def get_staging_lines(self, db, staging_id: int):
        return await self.staging_line.get_by_staging(db, staging_id)


    #  OFFICIAL SCORE
    async def insert_official_score(self, db, staging: dict, totals: dict, recorder_id: int):
        """
        Convert staging → official score
        """
        score_row = {
            "archer_id": staging["archer_id"],
            "competition_id": staging["competition_id"],
            "round_id": staging["round_id"],
            "total": totals["total"],
            "adjusted_total": totals["equivalent_total"],
            "is_practice": False,
            "is_approved": True,
            "approved_by": recorder_id,
        }

        created = await self.score.create(db, score_row)
        score_id = created[0]["score_id"]

        # Save arrow lines
        for end_id, arrows in totals["per_end"].items():
            pass  # totals only contains sums, but we need individual lines — see below

        # Real implementation: copy from staging_score_line
        staging_lines = await self.staging_line.get_by_staging(db, staging["staging_score_id"])
        for l in staging_lines:
            await self.score_line.create(db, {
                "score_id": score_id,
                "end_id": l["end_id"],
                "arrow_number": l["arrow_number"],
                "arrow_score": l["arrow_score"],
            })

        return {
            "score_id": score_id,
            "total": totals["total"],
            "adjusted_total": totals["equivalent_total"],
        }


    async def get_score(self, db, score_id: int):
        return await self.score.get_by_id(db, score_id)


    #  APPROVE (optional wrapper)
    async def approve_staging(self, db, staging_id: int, recorder_id: int):
        """
        Optional: update status = Approved
        """
        return await self.entry.update(
            db,
            staging_id,
            {"status": "Approved", "recorded_by": recorder_id}
        )


    #  AUDIT
    async def audit_log(self, db, action: str, performer: int, target_staging_id=None, target_score_id=None, notes=None):
        row = {
            "action_type": action,
            "performed_by": performer,
            "target_staging_id": target_staging_id,
            "target_score_id": target_score_id,
            "notes": notes,
        }
        return await self.audit.create(db, row)
