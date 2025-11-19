TABLE = "competition_round"

class CompetitionRoundRepository:

    async def list_by_competition(self, db, competition_id: int):
        params = {"competition_id": f"eq.{competition_id}"}
        return await db.select(TABLE, params)

competition_round_repo = CompetitionRoundRepository()
