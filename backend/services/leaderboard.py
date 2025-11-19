from typing import List, Dict, Optional
from services.repo_adapter import RepoAdapter
from services.scoring import count_xs, count_tens

async def build_leaderboard(repo: RepoAdapter, competition_id: Optional[int] = None, round_id: Optional[int] = None, division_id: Optional[int] = None, class_id: Optional[int] = None, limit: int = 100) -> List[Dict]:
    """
    Query repo for official scores matching competition/round/filters.
    Expected repo.get_by_competition_round to return rows with:
      - score_id, archer_id, total, approved_at, xs_count (optional), tens_count (optional), archer_name (optional)
    If xs_count or tens_count missing, compute from lines.
    Sorting rule: total desc, xs_count desc, tens_count desc, approved_at asc
    """
    rows = await repo.get_official_by_competition_round(competition_id=competition_id, round_id=round_id, filters={"division_id": division_id, "class_id": class_id})
    normalized = []
    for r in rows:
        xs = r.get("xs_count")
        tens = r.get("tens_count")
        if xs is None or tens is None:
            lines = r.get("lines", [])
            xs = count_xs(lines) if xs is None else xs
            tens = count_tens(lines) if tens is None else tens
        normalized.append({
            "score_id": r.get("score_id"),
            "archer_id": r.get("archer_id"),
            "archer_name": r.get("archer_name"),
            "total": r.get("total"),
            "xs_count": xs,
            "tens_count": tens,
            "approved_at": r.get("approved_at")
        })
    # sort
    sorted_rows = sorted(normalized, key=lambda it: (-it["total"], -it["xs_count"], -it["tens_count"], it["approved_at"] or ""))
    return sorted_rows[:limit]
