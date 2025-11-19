# services/scoring.py

from typing import List, Dict


class ScoringService:
    def __init__(self, adapter):
        self.adapter = adapter

    # MAIN ENTRY: Caculate total + equivalent_total
    async def compute_totals(self, db, round_id: int, lines: List[dict], archer_id: int) -> Dict:
        """
        Returns:
            {
                "total": int,
                "equivalent_total": int,
                "per_end": { end_id: sum(int) }
            }
        """
        # 1. Normalize arrow values (X → 6)
        normalized = self._normalize_arrows(lines)

        # 2. Group by end
        grouped = self._group_by_end(normalized)

        # 3. Calculate raw total for each end
        per_end = {}
        total = 0

        for end_id, arrows in grouped.items():
            s = sum(a["arrow_score"] for a in arrows)
            per_end[end_id] = s
            total += s

        # 4. Calculate equivalent_score
        equivalent_total = await self._compute_equivalent_score(
            db=db,
            round_id=round_id,
            archer_id=archer_id,
            total=total
        )

        return {
            "total": total,
            "equivalent_total": equivalent_total,
            "per_end": per_end,
        }

    # Normalize arrow score: “X” → 6
    def _normalize_arrows(self, lines: List[dict]):
        result = []
        for l in lines:
            score = l["arrow_score"]
            if score == "X":
                score = 10
            result.append({
                "end_id": l["end_id"],
                "arrow_number": l["arrow_number"],
                "arrow_score": int(score)
            })
        return result

    # Group arrow by end_id
    def _group_by_end(self, lines: List[dict]):
        grouped = {}
        for l in lines:
            e = l["end_id"]
            if e not in grouped:
                grouped[e] = []
            grouped[e].append(l)
        return grouped

    # Equivalent Score Calculation
    async def _compute_equivalent_score(self, db, round_id: int, archer_id: int, total: int) -> int:
        """
        Logic:
            - If no rules change → equivalent_total = total
            - If have → total × score_factor
        """
        # Get archer to know class/division
        archer = await self.adapter.archer.get(db, archer_id)
        if not archer:
            return total

        class_id = archer["class_id"]
        division_id = archer["default_division_id"]

        # Find changed rules
        rule = await self.adapter.equivalent.get_rule(
            db=db,
            round_id=round_id,
            class_id=class_id,
            division_id=division_id,
        )

        # If not rules -> No change
        if not rule:
            return total

        score_factor = float(rule["score_factor"])
        equivalent_score = int(round(total * score_factor))

        return equivalent_score
