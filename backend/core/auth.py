from fastapi import Header, HTTPException
from typing import Optional
from pydantic import BaseModel
import httpx
from app.config import settings
from core.logging import logger

class CurrentUser(BaseModel):
    id: int
    email: Optional[str] = None
    role: str = "Archer"  # Archer | Recorder | Admin


async def supabase_get_user(token: str) -> Optional[CurrentUser]:
    """
    Fetch Supabase user profile using JWT.
    """
    url = f"{settings.SUPABASE_URL}/auth/v1/user"
    headers = {
        "Authorization": f"Bearer {token}",
        "apikey": settings.SUPABASE_KEY,
    }

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(url, headers=headers)

    if response.status_code != 200:
        logger.warning("Supabase auth rejected token")
        return None

    data = response.json()

    # Map Supabase user -> system roles
    meta = data.get("user_metadata", {}) or {}
    role = meta.get("role", "Archer")

    try:
        local_id = int(data["id"][-6:], 16)
    except:
        local_id = -1

    return CurrentUser(
        id=local_id,
        email=data.get("email"),
        role=role
    )


async def get_current_user(authorization: Optional[str] = Header(None)):
    """
    Validate Authorization: Bearer <token>.
    """
    if not authorization:
        raise HTTPException(401, "Missing Authorization header")

    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(401, "Invalid Authorization header")

    token = parts[1]
    user = await supabase_get_user(token)

    if not user:
        raise HTTPException(401, "Invalid or expired token")

    return user
