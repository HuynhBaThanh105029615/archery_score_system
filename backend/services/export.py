# services/export.py

import csv
import io
from typing import List, Dict, Any


class ExportService:
    def __init__(self, adapter):
        self.adapter = adapter

    # EXPORT COMPETITION RESULT TO CSV
    async def export_competition_csv(
        self,
        db,
        competition_id: int,
        use_equivalent: bool = True
    ) -> str:
        """
        Returns CSV string of competition leaderboard.
        """
        # Get leaderboard via adapter->leaderboard or direct service
        # fallback: direct score list
        try:
            scores = await self.adapter.score.list_by_competition(db, competition_id)
        except Exception:
            scores = await db.select("score", params={"competition_id": f"eq.{competition_id}"})

        # Sort scores (best first)
        scores_sorted = sorted(
            scores,
            key=lambda s: float(s.get("equivalent_total") or s.get("total") or 0),
            reverse=True
        )

        # Prepare CSV
        output = io.StringIO()
        writer = csv.writer(output)

        writer.writerow([
            "Rank",
            "Archer ID",
            "Archer Name",
            "Round",
            "Total",
            "Equivalent Total",
            "Division",
            "Date"
        ])

        current_rank = 0
        last_value = None

        for i, s in enumerate(scores_sorted):
            val = float(s.get("equivalent_total") or s.get("total") or 0)
            if last_value is None or val != last_value:
                current_rank += 1
                last_value = val

            # Get archer name if repo has it
            archer_name = None
            if hasattr(self.adapter, "archer"):
                try:
                    ar = await self.adapter.archer.get(db, s["archer_id"])
                    archer_name = ar.get("name") if ar else None
                except Exception:
                    pass

            writer.writerow([
                current_rank,
                s.get("archer_id"),
                archer_name,
                s.get("round_id"),
                s.get("total"),
                s.get("equivalent_total"),
                s.get("division_id"),
                s.get("date")
            ])

        return output.getvalue()
    
    # EXPORT PB LIST FOR AN ARCHER
    async def export_pb_csv(
        self,
        db,
        archer_id: int,
        use_equivalent: bool = True
    ) -> str:
        """
        Export all PBs for one archer (per round).
        """
        try:
            scores = await self.adapter.score.list_by_archer(db, archer_id)
        except Exception:
            scores = await db.select("score", params={"archer_id": f"eq.{archer_id}"})

        if not scores:
            raise ValueError("No scores found")

        # group by round
        rounds = {}
        for s in scores:
            rid = s["round_id"]
            if rid not in rounds:
                rounds[rid] = []
            rounds[rid].append(s)

        # compute best per round
        output = io.StringIO()
        writer = csv.writer(output)

        writer.writerow([
            "Round ID",
            "Date",
            "Total",
            "Equivalent Total"
        ])

        for rid, list_scores in rounds.items():
            best = max(
                list_scores,
                key=lambda s: float(s.get("equivalent_total") or s.get("total") or 0)
            )
            writer.writerow([
                rid,
                best.get("date"),
                best.get("total"),
                best.get("equivalent_total"),
            ])

        return output.getvalue()
