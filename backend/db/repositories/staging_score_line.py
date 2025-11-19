TABLE = "staging_score_line"

class StagingScoreLineRepository:

    async def create(self, db, data: dict):
        return await db.insert(TABLE, data)

    async def list_by_staging(self, db, staging_id: int):
        params = {"staging_score_id": f"eq.{staging_id}"}
        return await db.select(TABLE, params)

staging_score_line_repo = StagingScoreLineRepository()
