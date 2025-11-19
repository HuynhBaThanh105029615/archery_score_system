TABLE = "score_line"

class ScoreLineRepository:

    async def create(self, db, data: dict):
        return await db.insert(TABLE, data)

    async def list_by_score(self, db, score_id: int):
        params = {"score_id": f"eq.{score_id}"}
        return await db.select(TABLE, params)

score_line_repo = ScoreLineRepository()
