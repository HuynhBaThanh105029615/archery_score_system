"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RecorderDashboardUI, { TournamentItem, ScoreItem } from "@/src/component/RecorderDashboardUI";
import RecorderTournamentUI from "@/src/component/RecorderTournamentUI";
import { tournaments } from "@/src/_data/tournaments";
import { allScores as importedScore } from "@/src/_data/scores";

export function RecorderProfilePage() {
  const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
  const router = useRouter();

  // ✅ Updated score data using your ScoreItem interface
  const allScores: Record<number, ScoreItem[]> = importedScore


  const history: ScoreItem[] = Object.values(allScores).flat();

  // ✅ Handle tournament entry
  const handleEnterTournament = (id: number) => setSelectedTournament(id);

  // ✅ Navigate to Archer Detail page
  const handleViewDetails = (scoreId: number) => {
    router.push(`/recorder/archer/${scoreId}`);
  };

  const handleBackToDashboard = () => setSelectedTournament(null);

  // ✅ Tournament Page
  if (selectedTournament) {
    const tournament = tournaments.find((t) => t.competition_id === selectedTournament);
    const scores = allScores[selectedTournament] || [];

    return (
      <div className="relative">
        <button
          onClick={handleBackToDashboard}
          className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        <RecorderTournamentUI
          tournamentName={tournament?.name || "Tournament"}
          scores={scores} // includes details
          onApprove={(id) => console.log("Approved score:", id)}
          onDisapprove={(id) => console.log("Disapproved score:", id)}
          onViewDetails={handleViewDetails} // NEW
        />
      </div>
    );
  }

  // ✅ Dashboard
  return (
    <RecorderDashboardUI
      tournaments={tournaments}
      scores={history.reverse()} // history scores
      onEnterTournament={handleEnterTournament}
      onDisapproveScore={(id) => console.log("Disapprove Score", id)}
      onViewDetails={handleViewDetails} // pass to UI
    />
  );
}

