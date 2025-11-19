import asyncio
from supabase import create_client

class DBAdapter:
    """
    Adapter layer that exposes:
        select(table, params)
        insert(table, data)
        update(table, data, match)
        delete(table, match)
    and translates them into Supabase client calls.
    """

    def __init__(self, url, key):
        self.client = create_client(url, key)

    # ------------------------------
    # PARSE params like {"name": "eq.John"} or {"limit": 50}
    # ------------------------------
    def _apply_params(self, query, params):
        for key, value in params.items():
            if key == "limit":
                query = query.limit(value)
            elif key == "offset":
                query = query.range(value, value + 999_999)
            elif key == "order":
                column, direction = value.split(".")
                query = query.order(column, desc=(direction == "desc"))
            else:
                # normal filter: {"archer_id": "eq.5"}
                op, val = value.split(".", 1)
                query = query.filter(key, op, val)

        return query

    # ------------------------------
    # SELECT
    # ------------------------------
    async def select(self, table, params):
        def _run():
            q = self.client.table(table).select("*")
            q = self._apply_params(q, params)
            return q.execute().data
        
        return await asyncio.to_thread(_run)

    # ------------------------------
    # INSERT
    # ------------------------------
    async def insert(self, table, data):
        def _run():
            return self.client.table(table).insert(data).execute().data
        
        return await asyncio.to_thread(_run)

    # ------------------------------
    # UPDATE
    # ------------------------------
    async def update(self, table, data, match):
        def _run():
            q = self.client.table(table).update(data)
            for col, val in match.items():
                q = q.eq(col, val)
            return q.execute().data

        return await asyncio.to_thread(_run)

    # ------------------------------
    # DELETE
    # ------------------------------
    async def delete(self, table, match):
        def _run():
            q = self.client.table(table).delete()
            for col, val in match.items():
                q = q.eq(col, val)
            return q.execute().data

        return await asyncio.to_thread(_run)
