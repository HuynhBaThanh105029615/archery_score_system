
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RecorderDashboardUI, { ScoreItem } from "@/src/component/RecorderDashboardUI";
import RecorderTournamentUI from "@/src/component/RecorderTournamentUI";
import { tournaments } from "@/src/_data/tournaments";
import { allScores } from "@/src/_data/scores";

export function RecorderProfilePage() {
  const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
  const router = useRouter();

  // ✅ Flatten all scores
  const allScoreList: ScoreItem[] = Object.values(allScores).flat();

  // ✅ Show only pending scores for the dashboard list
  const pendingScores = allScoreList.filter((s) => s.status === "pending");

  const handleEnterTournament = (id: number) => setSelectedTournament(id);

  const handleBackToDashboard = () => setSelectedTournament(null);

  const handleApprove = (id: number) => {
    console.log("Approved score:", id);
  };

  const handleDisapprove = (id: number) => {
    console.log("Disapproved score:", id);
  };

  // ✅ Navigate to Archer Detail Page
  const handleViewDetails = (scoreId: number) => {
    router.push(`/recorder/archer/${scoreId}`);
  };

  // ✅ Tournament Page
  if (selectedTournament) {
    const tournament = tournaments.find(
      (t) => t.competition_id === selectedTournament
    );
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
          scores={scores}
          onApprove={handleApprove}
          onDisapprove={handleDisapprove}
        />
      </div>
    );
  }

  // ✅ Dashboard (only pending scores)
  return (
    <RecorderDashboardUI
      tournaments={tournaments}
      scores={pendingScores} // ✅ Only pending
      onEnterTournament={handleEnterTournament}
      onDisapproveScore={handleDisapprove}
      onViewDetails={handleViewDetails}
    />
  );
}
