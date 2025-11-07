"use client";

import { useState } from "react";
import RecorderDashboardUI, { TournamentItem, ScoreItem } from "@/src/component/RecorderDashboardUI";
import RecorderTournamentUI from "@/src/component/RecorderTournamentUI";

export function RecorderProfilePage() {
  // ✅ State to track current view
  const [selectedTournament, setSelectedTournament] = useState<number | null>(
    null
  );

  // ✅ Tournament data
  const tournaments: TournamentItem[] = [
    {
      competition_id: 1,
      name: "Regional Open 2025",
      date: "2025-03-14",
      location: "New York, USA",
      is_championship_part: false,
      created_by: "Admin James",
    },
    {
      competition_id: 2,
      name: "City Classic",
      date: "2025-04-02",
      location: "Los Angeles, USA",
      is_championship_part: false,
      created_by: "Admin Sarah",
    },
    {
      competition_id: 3,
      name: "Spring Invitational",
      date: "2025-05-08",
      location: "Chicago, USA",
      is_championship_part: true,
      created_by: "Admin Kevin",
    },
    {
      competition_id: 4,
      name: "Summer Cup",
      date: "2025-06-20",
      location: "Houston, USA",
      is_championship_part: false,
      created_by: "Admin David",
    },
    {
      competition_id: 5,
      name: "National Qualifier",
      date: "2025-07-12",
      location: "Miami, USA",
      is_championship_part: true,
      created_by: "Admin Olivia",
    },
  ];

  // ✅ Score data (for tournament detail)
  const allScores: Record<number, ScoreItem[]> = {
    1: [
      { id: 1, archer: "John Doe", score: 290, status: "pending" },
      { id: 2, archer: "Jane Smith", score: 278, status: "pending" },
      { id: 3, archer: "Alex Johnson", score: 305, status: "approved" },
    ],
    2: [
      { id: 4, archer: "Maria Garcia", score: 267, status: "pending" },
      { id: 5, archer: "Li Wei", score: 312, status: "approved" },
      { id: 6, archer: "Noah Brown", score: 251, status: "pending" },
    ],
    3: [
      { id: 7, archer: "Emily Davis", score: 298, status: "approved" },
      { id: 8, archer: "Oliver Martinez", score: 283, status: "pending" },
      { id: 9, archer: "Sophia Wilson", score: 275, status: "pending" },
    ],
    4: [
      { id: 10, archer: "Ethan Clark", score: 299, status: "approved" },
      { id: 11, archer: "Ava Lewis", score: 264, status: "pending" },
      { id: 12, archer: "Mason Walker", score: 307, status: "approved" },
    ],
    5: [
      { id: 13, archer: "Isabella Hall", score: 288, status: "pending" },
      { id: 14, archer: "Lucas Allen", score: 270, status: "pending" },
      { id: 15, archer: "Mia Young", score: 320, status: "approved" },
      { id: 16, archer: "Logan Hernandez", score: 255, status: "pending" },
    ],
  };

  // ✅ Mock global history
  const history: ScoreItem[] = Object.values(allScores).flat();

  // ✅ Handle tournament entry
  const handleEnterTournament = (id: number) => {
    setSelectedTournament(id);
  };

  // ✅ Handle back to dashboard
  const handleBackToDashboard = () => {
    setSelectedTournament(null);
  };

  // ✅ If a tournament is selected → show tournament page
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
          scores={scores
            .filter((s) => s.status === "pending") //only show pending
            .map((s) => ({
              id: s.id,
              archer: s.archer,
              score: s.score,
              category: s.score >= 300 ? "Senior" : "Junior",
            }))}
          onApprove={(id) => console.log("Approved score:", id)}
          onDisapprove={(id) => console.log("Disapproved score:", id)}
        />
      </div>
    );
  }

  // ✅ Otherwise → show main dashboard
  return (
  <RecorderDashboardUI
    tournaments={tournaments}
    history={history.slice(-5).reverse()}
    allScores={allScores} // ✅ add this line
    onEnterTournament={handleEnterTournament}
    onDisapproveScore={(id) => console.log("Disapprove Score", id)}
    onEnterScore={(id) => console.log("Enter Score", id)}
  />
);

}