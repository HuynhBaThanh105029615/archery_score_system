"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import RecorderDashboardUI, {
  ScoreItem,
  CompetitionItem,
} from "@/src/component/RecorderDashboardUI";

import RecorderCompetitionUI from "@/src/component/RecorderTournamentUI";

import { competitionsApi } from "@/src/api";

// Mock scores still used for now (replace with API later)
import { allScores } from "@/src/_data/scores";

export function RecorderProfilePage() {
  const router = useRouter();

  const [competitions, setCompetitions] = useState<CompetitionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(
    null
  );

  // -----------------------------------------------
  // LOAD COMPETITIONS FROM BACKEND
  // -----------------------------------------------
  useEffect(() => {
    const loadCompetitions = async () => {
      try {
        const data = await competitionsApi.list();

        const mapped: CompetitionItem[] = data.map((c) => ({
          competition_id: c.competition_id ?? 0,
          name: c.name,
          date: c.date,
          location: c.location ?? "",
          is_championship_part: !!c.is_championship_part,
          created_by: c.created_by ?? null,
        }));

        setCompetitions(mapped);
      } catch (err) {
        console.error("Failed to load competitions", err);
      } finally {
        setLoading(false);
      }
    };

    loadCompetitions();
  }, []);

  // -----------------------------------------------
  // MOCK SCORES (replace with API later)
  // -----------------------------------------------
  const allScoreList: ScoreItem[] = Object.values(allScores).flat();
  const pendingScores = allScoreList.filter((s) => s.status === "pending");

  const handleEnterCompetition = (id: number) => setSelectedCompetition(id);
  const handleBackToDashboard = () => setSelectedCompetition(null);

  const handleApprove = (id: number) => {
    console.log("Approved score:", id);
  };

  const handleDisapprove = (id: number) => {
    console.log("Disapproved score:", id);
  };

  const handleViewDetails = (scoreId: number) => {
    router.push(`/recorder/archer/${scoreId}`);
  };

  // -----------------------------------------------
  // COMPETITION DETAIL PAGE
  // -----------------------------------------------
  if (selectedCompetition) {
    const competition = competitions.find(
      (c) => c.competition_id === selectedCompetition
    );

    const scores = allScores[selectedCompetition] || [];

    return (
      <div className="relative">
        <button
          onClick={handleBackToDashboard}
          className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <RecorderCompetitionUI
          competitionName={competition?.name || "Competition"}
          scores={scores}
          onApprove={handleApprove}
          onDisapprove={handleDisapprove}
        />
      </div>
    );
  }

  // -----------------------------------------------
  // MAIN DASHBOARD PAGE
  // -----------------------------------------------
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading...</div>
    );
  }

  return (
    <RecorderDashboardUI
      competitions={competitions}
      scores={pendingScores}
      onEnterCompetition={handleEnterCompetition}
      onDisapproveScore={handleDisapprove}
      onViewDetails={handleViewDetails}
    />
  );
}
