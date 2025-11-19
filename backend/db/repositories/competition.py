TABLE = "competition"

class CompetitionRepository:

    async def list(self, db, limit=50, offset=0):
        params = {
            "limit": limit,
            "offset": offset,
            "order": "date.desc"
        }
        return await db.select(TABLE, params)

    async def get(self, db, competition_id: int):
        params = {"competition_id": f"eq.{competition_id}"}
        resp = await db.select(TABLE, params)
        return resp[0] if resp else None

    async def create(self, db, data: dict):
        return await db.insert(TABLE, data)

competition_repo = CompetitionRepository()
