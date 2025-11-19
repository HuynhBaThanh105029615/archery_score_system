TABLE = "round"

class RoundRepository:

    async def get(self, db, round_id: int):
        params = {"round_id": f"eq.{round_id}"}
        resp = await db.select(TABLE, params)
        return resp[0] if resp else None

    async def list(self, db):
        return await db.select(TABLE)

round_repo = RoundRepository()
