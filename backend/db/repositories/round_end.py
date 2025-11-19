TABLE = "round_end"

class RoundEndRepository:

    async def list_by_range(self, db, range_id: int):
        params = {"range_id": f"eq.{range_id}"}
        return await db.select(TABLE, params)

round_end_repo = RoundEndRepository()
