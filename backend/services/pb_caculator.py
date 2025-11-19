from typing import List, Optional, Dict, Any
from services.repo_adapter import RepoAdapter
from services.scoring import count_xs

async def compute_pb(repo: RepoAdapter, archer_id: int, round_id: int, equivalent_rounds: Optional[List[int]] = None) -> Optional[Dict]:
    """
    Get list of official scores for archer & round (and equivalent rounds if provided),
    and return the best score row.
    Expected score rows to have fields:
      - score_id, total, approved_at (ISO string/datetime), xs_count (if not provided we can compute by fetching lines)
    If xs_count not present, repo.score.get_by_archer_round should return lines or xs_count.
    """
    # collect rows for round and equivalent rounds (if provided)
    all_rounds = [round_id] + (equivalent_rounds or [])
    best = None

    for r_id in all_rounds:
        rows = await repo.get_official_by_archer_round(archer_id=archer_id, round_id=r_id)
        for row in rows:
            # ensure basic fields
            total = row.get("total")
            approved_at = row.get("approved_at")
            xs = row.get("xs_count")
            if xs is None:
                # optionally compute xs by fetching lines (repo should provide this)
                lines = row.get("lines") or []
                xs = count_xs(lines)
            # Normalize candidate
            candidate = {
                "score_id": row.get("score_id"),
                "total": total,
                "xs_count": xs,
                "approved_at": approved_at,
                "archer_id": row.get("archer_id"),
                "round_id": row.get("round_id")
            }
            if best is None:
                best = candidate
                continue
            # Compare
            if candidate["total"] > best["total"]:
                best = candidate
            elif candidate["total"] == best["total"]:
                if candidate["xs_count"] > best["xs_count"]:
                    best = candidate
                elif candidate["xs_count"] == best["xs_count"]:
                    # earlier approved_at wins
                    try:
                        if candidate["approved_at"] and best["approved_at"] and candidate["approved_at"] < best["approved_at"]:
                            best = candidate
                    except Exception:
                        # if parsing unavailable, leave best
                        pass
    return best
