from services.db_adapter import DBAdapter
from app.config import settings

_db = None

def get_db():
    global _db
    if _db is None:
        _db = DBAdapter(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return _db
