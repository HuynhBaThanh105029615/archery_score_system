from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware

from core.logging import setup_logging
from app.config import settings

# Import routers
from api.v1 import (
    auth_router,
    entries_router,
    validate_router,
    scores_router,
    competitions_router,
    leaderboard_router,
    export_router,
    rounds_router,
    equiv_router,
    audit_router,
    archers_router,
    class_router,
    division_router,
    category_router,
)

setup_logging()

app = FastAPI(
    title="Archery Score System",
    version="1.0.0",
    openapi_tags=[]
)

# ------------------------------
# ⭐ ENABLE CORS (Fixes 405 & token sending)
# ------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],      # ⭐ Includes OPTIONS
    allow_headers=["*"],      # ⭐ Allows Authorization
)


# ------------------------------
# ⭐ OPTIONAL Security Headers
# ------------------------------
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response


# ------------------------------
# Custom OpenAPI for JWT scheme
# ------------------------------
app.openapi_schema = None

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description="API backend for Archery scoring, staging, validation, competition & leaderboard.",
        routes=app.routes,
    )

    openapi_schema.setdefault("components", {})["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    openapi_schema["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi


# ------------------------------
# Include all routers
# ------------------------------
app.include_router(auth_router,          prefix="/api/v1/auth",           tags=["Auth"])
app.include_router(archers_router,       prefix="/api/v1/archers",        tags=["Archers"])
app.include_router(class_router,         prefix="/api/v1/classes",        tags=["Classes"])
app.include_router(division_router,      prefix="/api/v1/divisions",      tags=["Divisions"])
app.include_router(category_router,      prefix="/api/v1/categories",     tags=["Categories"])

app.include_router(rounds_router,        prefix="/api/v1/rounds",         tags=["Rounds"])
app.include_router(equiv_router,         prefix="/api/v1/equivalent-rule",tags=["Equivalent Rule"])

app.include_router(competitions_router,  prefix="/api/v1/competitions",   tags=["Competitions"])

app.include_router(entries_router,       prefix="/api/v1/entries",        tags=["Entries"])
app.include_router(validate_router,      prefix="/api/v1/validate",       tags=["Validation"])

app.include_router(scores_router,        prefix="/api/v1/scores",         tags=["Scores"])
app.include_router(leaderboard_router,   prefix="/api/v1/leaderboard",    tags=["Leaderboard"])
app.include_router(export_router,        prefix="/api/v1/export",         tags=["Export"])
app.include_router(audit_router,         prefix="/api/v1/audit",          tags=["Audit Logs"])


# ------------------------------
# Health Check
# ------------------------------
@app.get("/health")
async def health():
    return {"status": "ok"}
