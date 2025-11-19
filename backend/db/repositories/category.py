TABLE = "category"

class CategoryRepository:

    async def get_all(self, db):
        return await db.select(TABLE)

category_repo = CategoryRepository()
