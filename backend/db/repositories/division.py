TABLE = "division"

class DivisionRepository:
    async def get_all(self, db):
        return await db.select(TABLE)

division_repo = DivisionRepository()
