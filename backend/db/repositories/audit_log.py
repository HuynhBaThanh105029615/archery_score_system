TABLE = "audit_log"

class AuditLogRepository:

    async def insert(self, db, data: dict):
        return await db.insert(TABLE, data)

    async def list_by_score(self, db, score_id: int):
        params = {"target_score_id": f"eq.{score_id}"}
        return await db.select(TABLE, params)

    async def list_by_staging(self, db, staging_id: int):
        params = {"target_staging_id": f"eq.{staging_id}"}
        return await db.select(TABLE, params)

audit_repo = AuditLogRepository()
