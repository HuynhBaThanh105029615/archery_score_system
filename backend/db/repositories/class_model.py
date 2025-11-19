TABLE = "class"

class ClassRepository:

    async def get_all(self, db):
        return await db.select(TABLE)

class_repo = ClassRepository()
