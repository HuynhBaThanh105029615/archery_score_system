TABLE = "recorder"

class RecorderRepository:
    async def get(self, db, recorder_id: int):
        params = {"recorder_id": f"eq.{recorder_id}"}
        resp = await db.select(TABLE, params)
        return resp[0] if resp else None

recorder_repo = RecorderRepository()
