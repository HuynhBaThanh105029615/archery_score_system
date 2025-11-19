from fastapi import Depends, HTTPException
from core.auth import CurrentUser, get_current_user

def require_roles(*allowed_roles: str):
    async def wrapper(user: CurrentUser = Depends(get_current_user)):
        if user.role not in allowed_roles:
            raise HTTPException(403, f"User role '{user.role}' is not allowed")
        return user
    return wrapper
