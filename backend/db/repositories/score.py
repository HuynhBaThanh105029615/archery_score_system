TABLE = "score"

class ScoreRepository:

    async def create(self, db, data: dict):
        return await db.insert(TABLE, data)

    async def get(self, db, score_id: int):
        params = {"score_id": f"eq.{score_id}"}
        resp = await db.select(TABLE, params)
        return resp[0] if resp else None

    async def list_by_competition(self, db, competition_id: int):
        params = {"competition_id": f"eq.{competition_id}"}
        return await db.select(TABLE, params)

score_repo = ScoreRepository()
