"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import RecorderDashboardUI, {
  ScoreItem,
  CompetitionItem,
} from "@/src/component/RecorderDashboardUI";
import RecorderCompetitionUI from "@/src/component/RecorderTournamentUI";

import { competitionsApi, scoresApi, divisionApi } from "@/src/api";

interface RecorderProfileProps {
  user: {
    id: number;
    name: string;
    role: string;
  };
}

export function RecorderProfilePage({ user }: RecorderProfileProps) {
  const router = useRouter();

  const [competitions, setCompetitions] = useState<CompetitionItem[]>([]);
  const [pendingScores, setPendingScores] = useState<ScoreItem[]>([]);
  const [competitionScores, setCompetitionScores] = useState<ScoreItem[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);

  // -------------------------------------------------------
  // Safe bow type lookup
  // -------------------------------------------------------
  const getBowType = (division_id: number | null | undefined): string => {
    if (!division_id) return "Unknown";
    const div = divisions.find((d) => d.division_id === division_id);
    return div?.name ?? "Unknown";
  };

  // -------------------------------------------------------
  // LOAD DASHBOARD DATA
  // -------------------------------------------------------
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [divList, compList, scoreList] = await Promise.all([
          divisionApi.list(),
          competitionsApi.list(),
          scoresApi.list({ limit: 200 }),
        ]);

        setDivisions(divList);

        setCompetitions(
          compList.map((c: any): CompetitionItem => ({
            competition_id: c.competition_id!,
            name: c.name,
            date: c.date,
            location: c.location ?? "",
            is_championship_part: !!c.is_championship_part,
            created_by: c.created_by ?? null,
          }))
        );

        const pending = scoreList.filter((s: any) => s.is_approved === false);

        setPendingScores(
          pending.map((s: any): ScoreItem => ({
            id: s.score_id!,
            archer: s.archer_name,
            tournament_name: s.competition_name,
            bow_type: getBowType(s.division_id),
            total_score: s.total,
            status: s.is_approved ? "approved" : "pending",
            submitted_at: s.created_at ?? "",
            competition_id: s.competition_id!,
            competition_name: s.competition_name,
          }))
        );


      } catch (err) {
        console.error("Failed to load recorder dashboard", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // -------------------------------------------------------
  // LOAD COMPETITION SCORES
  // -------------------------------------------------------
  async function loadCompetitionScores(id: number) {
  try {
    const scoreList = await scoresApi.list({ competition_id: id });

    // Show ONLY pending scores
    const pending = scoreList.filter((s: any) => s.is_approved === false);

    setCompetitionScores(
      pending.map((s: any): ScoreItem => ({
        id: s.score_id!,
        archer: s.archer_name,
        tournament_name: s.competition_name,
        bow_type: getBowType(s.division_id),
        total_score: s.total,
        status: "pending",
        submitted_at: s.created_at ?? "",
        competition_id: s.competition_id!,
        competition_name: s.competition_name,
      }))
    );
  } catch (err) {
    console.error("Failed to load competition scores:", err);
  }
}


  const handleEnterCompetition = async (id: number) => {
    setSelectedCompetition(id);
    await loadCompetitionScores(id);
  };

  const handleBackToDashboard = () => setSelectedCompetition(null);

  const handleApprove = async (id: number) => {
    try {
      await scoresApi.approve(id);
      alert("Score approved");
      router.refresh();
    } catch {
      alert("Failed to approve");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await scoresApi.reject(id);
      alert("Score rejected");
      router.refresh();
    } catch {
      alert("Failed to reject");
    }
  };

  const handleViewDetails = (scoreId: number) => {
    router.push(`/recorder/archer/${scoreId}`);
  };

  // -------------------------------------------------------
  // COMPETITION DETAIL PAGE
  // -------------------------------------------------------
  if (selectedCompetition) {
    const comp = competitions.find((c) => c.competition_id === selectedCompetition);

    return (
      <div className="relative">
        <button
          onClick={handleBackToDashboard}
          className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          ← Back
        </button>

        <RecorderCompetitionUI
          competitionName={comp?.name ?? "Competition"}
          scores={competitionScores}
          onApprove={handleApprove}
          onDisapprove={handleReject}
        />
      </div>
    );
  }

  // -------------------------------------------------------
  // MAIN DASHBOARD
  // -------------------------------------------------------
  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading…</div>;
  }

  return (
    <>
      {/* ⭐ Leaderboard Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/leaderboard")}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          View Leaderboard
        </button>
      </div>

      <RecorderDashboardUI
        competitions={competitions}
        scores={pendingScores}
        onEnterCompetition={handleEnterCompetition}
        onDisapproveScore={handleReject}
        onViewDetails={handleViewDetails}
      />
    </>
  );
}
