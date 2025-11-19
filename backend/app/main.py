from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

from core.logging import setup_logging
from app.config import settings

# Import all routers
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

# Custom OpenAPI to inject JWT scheme
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

    # apply global auth
    openapi_schema["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi


# Register ALL routers
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


# Health check
@app.get("/health")
async def health():
    return {"status": "ok"}
