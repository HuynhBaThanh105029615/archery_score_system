"use client";

import { FC, useState } from "react";
import { Search, X, Eye } from "lucide-react";

export interface CompetitionItem {
  competition_id: number;
  name: string;
  date: string;
  location: string | null;
  is_championship_part: boolean;
  created_by: number | null;
}

export interface ScoreItem {
  id: number;
  archer: string;
  bow_type: string;
  competition_id: number;
  competition_name: string;
  submitted_at: string;
  total_score: number;
  status: "pending" | "approved";
  details?: {
    round: number;
    range: string;
    shots: number[];
  }[];
}

interface Props {
  competitions: CompetitionItem[];
  scores: ScoreItem[];
  onEnterCompetition: (id: number) => void;
  onDisapproveScore: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const CompetitionsDashboardUI: FC<Props> = ({
  competitions,
  scores,
  onEnterCompetition,
  onDisapproveScore,
  onViewDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bowFilter, setBowFilter] = useState("All");
  const [competitionFilter, setCompetitionFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filteredScores = (scores || [])
    .filter((s) =>
      s.archer?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((s) => (bowFilter === "All" ? true : s.bow_type === bowFilter))
    .filter((s) =>
      competitionFilter === "All"
        ? true
        : s.competition_name === competitionFilter
    )
    .filter((s) =>
      dateFilter
        ? new Date(s.submitted_at).toISOString().slice(0, 10) === dateFilter
        : true
    )
    .sort(
      (a, b) =>
        new Date(b.submitted_at).getTime() -
        new Date(a.submitted_at).getTime()
    );

  const bowTypes = Array.from(new Set(scores.map((s) => s.bow_type)));
  const competitionNames = Array.from(
    new Set(scores.map((s) => s.competition_name))
  );

  return (
    <main className="min-h-screen text-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <section>
          <h2 className="text-3xl font-semibold">Welcome back 🎯</h2>
          <p className="text-sm text-gray-600 mt-2">
            You have{" "}
            <span className="font-medium text-yellow-600">
              {scores.filter((s) => s.status === "pending").length}
            </span>{" "}
            pending scores across{" "}
            <span className="font-medium text-green-600">
              {competitions.length}
            </span>{" "}
            competitions.
          </p>
        </section>

        {/* Filters */}
        <section className="bg-white p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="text-xl font-bold">📋 Archer Submissions</h3>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search archer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Bow filter */}
            <select
              value={bowFilter}
              onChange={(e) => setBowFilter(e.target.value)}
              className="px-3 py-2 text-sm border rounded-md"
            >
              <option value="All">All Bow Types</option>
              {bowTypes.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            {/* Competition filter */}
            <select
              value={competitionFilter}
              onChange={(e) => setCompetitionFilter(e.target.value)}
              className="px-3 py-2 text-sm border rounded-md"
            >
              <option value="All">All Competitions</option>
              {competitionNames.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            {/* Date filter */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 text-sm border rounded-md"
            />
          </div>

          {/* Score list */}
          <div className="divide-y">
            {filteredScores.map((score) => {
              const calculatedTotal =
                score.details?.reduce(
                  (sum, round) =>
                    sum + round.shots.reduce((a, b) => a + b, 0),
                  0
                ) ?? score.total_score;

              return (
                <div key={score.id} className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{score.archer}</div>
                      <div className="text-sm text-gray-600">
                        🏹 {score.bow_type} | 🏆 {score.competition_name}
                      </div>
                      <div className="text-xs text-gray-400">
                        Submitted:{" "}
                        {new Date(score.submitted_at).toLocaleString()}
                      </div>
                      <div className="text-sm mt-1 font-semibold">
                        Total Score: {calculatedTotal}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          score.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {score.status}
                      </span>

                      <button
                        onClick={() => onViewDetails(score.id)}
                        className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredScores.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                No scores found for these filters.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CompetitionsDashboardUI;
