from .auth import router as auth_router
from .entries import router as entries_router
from .validate import router as validate_router
from .scores import router as scores_router
from .competitions import router as competitions_router
from .leaderboard import router as leaderboard_router
from .export import router as export_router
from .rounds import router as rounds_router
from .equivalent_rule import router as equiv_router
from .audit_logs import router as audit_router
from .archers import router as archers_router
from .class_api import router as class_router
from .division_api import router as division_router
from .category_api import router as category_router

__all__ = [
    "auth_router",
    "entries_router",
    "validate_router",
    "scores_router",
    "competitions_router",
    "leaderboard_router",
    "export_router",
    "rounds_router",
    "equiv_router",
    "audit_router",
    "archers_router",
    "class_router",
    "division_router",
    "category_router",
]
