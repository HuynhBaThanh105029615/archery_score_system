TABLE = "division"

class DivisionRepository:
    async def get_all(self, db):
        return await db.select(TABLE, {})    # ← FIXED

    async def list(self, db):
        return await self.get_all(db)

division_repo = DivisionRepository()
