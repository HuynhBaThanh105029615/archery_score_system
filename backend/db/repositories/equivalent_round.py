TABLE = "equivalent_round"

class EquivalentRoundRepository:

    async def list_equivalent(self, db, round_id: int):
        params = {"round_id": f"eq.{round_id}"}
        return await db.select(TABLE, params)

equivalent_round_repo = EquivalentRoundRepository()
