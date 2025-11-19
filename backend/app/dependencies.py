from supabase import create_client
from app.config import settings

_supabase_client = None

def get_db():
    """
    Return Supabase client instance (singleton)
    """
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return _supabase_client
