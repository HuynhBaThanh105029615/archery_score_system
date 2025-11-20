TABLE = "recorder"

class RecorderRepository:
    async def list(self, db):
        return await db.select(TABLE, {})

    async def get(self, db, recorder_id: int):
        params = {"recorder_id": f"eq.{recorder_id}"}
        resp = await db.select(TABLE, params)
        return resp[0] if resp else None

    async def create(self, db, data: dict):
        return await db.insert(TABLE, data)

    async def update(self, db, recorder_id: int, data: dict):
        return await db.update(TABLE, recorder_id, data)

    async def delete(self, db, recorder_id: int):
        return await db.delete(TABLE, recorder_id)

recorder_repo = RecorderRepository()