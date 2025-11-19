TABLE = "staging_score"

class StagingScoreRepository:

    async def create(self, db, data: dict):
        return await db.insert(TABLE, data)

    async def get(self, db, staging_score_id: int):
        params = {"staging_score_id": f"eq.{staging_score_id}"}
        resp = await db.select(TABLE, params)
        return resp[0] if resp else None

    async def update_status(self, db, staging_score_id: int, status: str):
        match = {"staging_score_id": staging_score_id}
        return await db.update(TABLE, {"status": status}, match)

staging_score_repo = StagingScoreRepository()
