TABLE = "round_range"

class RoundRangeRepository:

    async def get_by_round(self, db, round_id: int):
        params = {"round_id": f"eq.{round_id}"}
        return await db.select(TABLE, params)

round_range_repo = RoundRangeRepository()
