"use client";

import { FC, useState, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";

export interface TournamentItem {
  competition_id: number;
  name: string;
  date: string;
  location: string;
  is_championship_part: boolean;
  created_by: string;
}

export interface ScoreItem {
  id: number;
  archer: string;
  bow_type: string;
  tournament_id: number;
  tournament_name: string;
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
  tournaments: TournamentItem[];
  scores: ScoreItem[];
  onEnterTournament: (id: number) => void;
  onDisapproveScore: (id: number) => void;
}

const RecorderDashboardUI: FC<Props> = ({
  tournaments,
  scores,
  onEnterTournament,
  onDisapproveScore,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bowFilter, setBowFilter] = useState("All");
  const [tournamentFilter, setTournamentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [expandedScore, setExpandedScore] = useState<number | null>(null);

  const filteredScores = (scores || [])
  .filter((s) =>
    s.archer?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((s) =>
    bowFilter === "All" ? true : s.bow_type === bowFilter
  )
  .filter((s) =>
    tournamentFilter === "All" ? true : s.tournament_name === tournamentFilter
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
  const tournamentNames = Array.from(new Set(scores.map((s) => s.tournament_name)));

  return (
    <main className="min-h-screen text-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <section>
          <h2 className="text-3xl font-semibold">Welcome back 🎯</h2>
          <p className="text-sm text-gray-600 mt-2">
            You have{" "}
            <span className="font-medium text-yellow-600">
              {scores.filter((s) => s.status === "pending").length}
            </span>{" "}
            pending scores across{" "}
            <span className="font-medium text-green-600">
              {tournaments.length}
            </span>{" "}
            tournaments.
          </p>
        </section>

        {/* Filters */}
        <section className="bg-white p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="text-xl font-bold">📋 Archer Submissions</h3>

          <div className="flex flex-wrap gap-3 items-center">
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

            <select
              value={tournamentFilter}
              onChange={(e) => setTournamentFilter(e.target.value)}
              className="px-3 py-2 text-sm border rounded-md"
            >
              <option value="All">All Tournaments</option>
              {tournamentNames.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 text-sm border rounded-md"
            />
          </div>

          {/* Archer List */}
          <div className="divide-y">
            {filteredScores.map((score) => (
              <div key={score.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{score.archer}</div>
                    <div className="text-sm text-gray-600">
                      🏹 {score.bow_type} | 🏆 {score.tournament_name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Submitted: {new Date(score.submitted_at).toLocaleString()}
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
                      onClick={() =>
                        setExpandedScore(
                          expandedScore === score.id ? null : score.id
                        )
                      }
                      className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-1">
                      {expandedScore === score.id ? "Hide Details" : "View Details"}
                      {expandedScore === score.id ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedScore === score.id && score.details && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 border">Round</th>
                          <th className="px-3 py-2 border">Range</th>
                          {score.details[0].shots.map((_, i) => (
                            <th key={i} className="px-3 py-2 border">
                              Shot {i + 1}
                            </th>
                          ))}
                          <th className="px-3 py-2 border">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {score.details.map((d, i) => (
                          <tr key={i}>
                            <td className="px-3 py-2 border text-center">
                              {d.round}
                            </td>
                            <td className="px-3 py-2 border text-center">
                              {d.range}
                            </td>
                            {d.shots.map((s, i2) => (
                              <td
                                key={i2}
                                className="px-3 py-2 border text-center"
                              >
                                {s}
                              </td>
                            ))}
                            <td className="px-3 py-2 border font-semibold text-center">
                              {d.shots.reduce((a, b) => a + b, 0)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

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

export default RecorderDashboardUI;
