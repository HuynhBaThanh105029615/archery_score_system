from typing import List, Tuple, Dict
from fastapi import HTTPException


VALID_ARROW_SCORES = {0, 1, 2, 3, 4, 5, 6,"X"} 


class ValidationError:
    def __init__(self, message: str, end_id=None, arrow_number=None):
        self.message = message
        self.end_id = end_id
        self.arrow_number = arrow_number

    def dict(self):
        return {
            "message": self.message,
            "end_id": self.end_id,
            "arrow_number": self.arrow_number
        }


class ValidationService:

    def __init__(self, adapter):
        self.adapter = adapter

    # MAIN ENTRY: Validate full staging score
    async def validate_staging(self, db, staging_id: int) -> Tuple[bool, List[ValidationError], Dict]:
        staging = await self.adapter.get_staging(db, staging_id)
        lines = await self.adapter.get_staging_lines(db, staging_id)

        if not staging:
            raise HTTPException(404, "Staging not found")

        errors = []
        totals = {}

        # Validate existence of round & end structure
        round_id = staging["round_id"]
        round_ends = await self.adapter.round.get_round_structure(db, round_id)

        if not round_ends:
            raise HTTPException(400, "Round structure missing in DB")

        # Group lines by end_id
        grouped = self._group_by_end(lines)

        # Start validating each end
        for end in round_ends:
            end_id = end["end_id"]
            expected_arrows = end["arrow_count"] if "arrow_count" in end else end["ends"]

            if end_id not in grouped:
                errors.append(ValidationError(f"Missing end {end_id}", end_id=end_id))
                continue

            arrows = grouped[end_id]

            # Validate number of arrows
            if len(arrows) != expected_arrows:
                errors.append(
                    ValidationError(
                        f"End {end_id} has {len(arrows)} arrows, expected {expected_arrows}",
                        end_id=end_id
                    )
                )

            # Validate each arrow score
            for arrow in arrows:
                number = arrow["arrow_number"]
                score = arrow["arrow_score"]

                if score not in VALID_ARROW_SCORES:
                    errors.append(
                        ValidationError(
                            f"Invalid arrow score '{score}'",
                            end_id=end_id,
                            arrow_number=number
                        )
                    )
                # Convert "X" → 10
                if score == "X":
                    arrow["arrow_score"] = 10

            # Compute end total
            end_total = sum(
                (10 if a["arrow_score"] == "X" else a["arrow_score"])
                for a in arrows
                if isinstance(a["arrow_score"], (int, float)) or a["arrow_score"] == "X"
            )
            totals[f"end_{end_id}"] = end_total

        is_valid = len(errors) == 0
        return is_valid, errors, totals

    # Helper: group arrows by end
    def _group_by_end(self, lines):
        result = {}
        for l in lines:
            end_id = l["end_id"]
            if end_id not in result:
                result[end_id] = []
            result[end_id].append(l)
        return result
