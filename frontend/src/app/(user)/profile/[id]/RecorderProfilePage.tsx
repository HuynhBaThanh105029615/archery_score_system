"use client";

import { useState, useEffect } from "react";
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

  const getBowType = (division_id: number | null | undefined) => {
    if (!division_id) return "Unknown";
    return divisions.find((d) => d.division_id === division_id)?.division_name ?? "Unknown";
  };

  // ---------------------------
  // LOAD INITIAL DASHBOARD DATA
  // ---------------------------
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [divs, comps, scores] = await Promise.all([
          divisionApi.list(),
          competitionsApi.list(),
          scoresApi.list({ limit: 200 }),
        ]);

        setDivisions(divs ?? []);

        setCompetitions(
          (comps ?? []).map((c: any) => ({
            competition_id: c.competition_id ?? 0,
            name: c.name,
            date: c.date,
            location: c.location ?? "",
            is_championship_part: !!c.is_championship_part,
            created_by: c.created_by ?? null,
          }))
        );

        const pending = (scores ?? []).filter((s: any) => s.status === "pending");

        setPendingScores(
          pending.map((s: any) => ({
            id: s.score_id,
            archer: s.archer_name,
            tournament_name: s.competition_name,
            bow_type: getBowType(s.division_id),
            total_score: s.total,
            status: s.status,
            submitted_at: s.created_at,
            competition_id: s.competition_id,
            competition_name: s.competition_name,
          }))
        );
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function loadCompetitionScores(id: number) {
    try {
      const scores = await scoresApi.list({ competition_id: id });

      setCompetitionScores(
        (scores ?? []).map((s: any) => ({
          id: s.score_id,
          archer: s.archer_name,
          tournament_name: s.competition_name,
          bow_type: getBowType(s.division_id),
          total_score: s.total,
          status: s.status,
          submitted_at: s.created_at,
          competition_id: s.competition_id,
          competition_name: s.competition_name,
        }))
      );
    } catch (err) {
      console.error("Failed to load competition scores", err);
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
      alert("Failed to approve score");
    }
  };

  const handleDisapprove = async (id: number) => {
    try {
      await scoresApi.reject(id);
      alert("Score rejected");
      router.refresh();
    } catch {
      alert("Failed to reject score");
    }
  };

  const handleViewDetails = (scoreId: number) => {
    router.push(`/recorder/archer/${scoreId}`);
  };

  // ---------------------------
  // COMPETITION DETAIL VIEW
  // ---------------------------
  if (selectedCompetition) {
    const competition = competitions.find(
      (c) => c.competition_id === selectedCompetition
    );

    return (
      <div className="relative">
        <button
          onClick={handleBackToDashboard}
          className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          ← Back
        </button>

        <RecorderCompetitionUI
          competitionName={competition?.name || "Competition"}
          scores={competitionScores}
          onApprove={handleApprove}
          onDisapprove={handleDisapprove}
        />
      </div>
    );
  }

  // ---------------------------
  // MAIN DASHBOARD
  // ---------------------------
  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
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
