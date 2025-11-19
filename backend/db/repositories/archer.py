from app.dependencies import get_db
TABLE = "archer"

class ArcherRepository:

    async def get_all(self, db):
        return await db.select(TABLE)

    async def get(self, db, archer_id: int):
        params = {"archer_id": f"eq.{archer_id}"}
        resp = await db.select(TABLE, params)
        return resp[0] if resp else None

    async def create(self, db, data: dict):
        return await db.insert(TABLE, data)

    async def update(self, db, archer_id: int, data: dict):
        match = {"archer_id": archer_id}
        return await db.update(TABLE, data, match)

    async def delete(self, db, archer_id: int):
        match = {"archer_id": archer_id}
        return await db.delete(TABLE, match)

archer_repo = ArcherRepository()
