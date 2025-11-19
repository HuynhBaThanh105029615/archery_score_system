from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client

from app.config import settings

router = APIRouter()

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


# -----------------------------
# Request Models
# -----------------------------
class LoginRequest(BaseModel):
    email: str
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


# -----------------------------
# POST /auth/login
# -----------------------------
@router.post("/login")
async def login(req: LoginRequest):
    try:
        resp = supabase.auth.sign_in_with_password(
            {"email": req.email, "password": req.password}
        )
        session = resp.session

        if not session:
            raise HTTPException(401, "Invalid email or password")

        return {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "token_type": "bearer",
            "user": {
                "id": session.user.id,
                "email": session.user.email,
            }
        }

    except Exception as e:
        raise HTTPException(400, str(e))


# -----------------------------
# POST /auth/refresh
# -----------------------------
@router.post("/refresh")
async def refresh(req: RefreshRequest):
    try:
        new_session = supabase.auth.refresh_session(req.refresh_token)

        if not new_session:
            raise HTTPException(401, "Invalid refresh token")

        return {
            "access_token": new_session.access_token,
            "refresh_token": new_session.refresh_token,
            "token_type": "bearer",
            "user": {
                "id": new_session.user.id,
                "email": new_session.user.email,
            }
        }

    except Exception as e:
        raise HTTPException(400, str(e))


# -----------------------------
# POST /auth/logout
# -----------------------------
@router.post("/logout")
async def logout():
    try:
        supabase.auth.sign_out()
        return {"ok": True, "message": "Logged out successfully"}
    except Exception as e:
        raise HTTPException(400, str(e))


# -----------------------------
# GET /auth/me
# -----------------------------
@router.get("/me")
async def me(token: str):
    """
    Optional: return the token provided.
    (Supabase verification can be added later)
    """
    return {"token_received": token}
