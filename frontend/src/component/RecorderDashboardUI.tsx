"use client";

import { FC, useState, useEffect } from "react";
import { Search, X } from "lucide-react";

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
  score: number;
  status: "pending" | "approved";
}

interface Props {
  tournaments: TournamentItem[];
  history: ScoreItem[];
  allScores: Record<number, ScoreItem[]>; // ✅ added
  onEnterTournament: (id: number) => void;
  onDisapproveScore: (id: number) => void;
  onEnterScore: (id: number) => void;
}

const RecorderDashboardUI: FC<Props> = ({
  tournaments,
  history,
  allScores,
  onEnterTournament,
  onDisapproveScore,
  onEnterScore,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tournamentFilter, setTournamentFilter] = useState("All");
  const [yearQuery, setYearQuery] = useState("");
  const [regionQuery, setRegionQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredTournaments = (tournaments || [])
    .filter((t) =>
      t.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((t) =>
      regionQuery
        ? t.location.toLowerCase().includes(regionQuery.toLowerCase())
        : true
    )
    .filter((t) =>
      yearQuery
        ? new Date(t.date).getFullYear().toString().includes(yearQuery)
        : true
    )
    .filter((t) => {
      if (tournamentFilter === "Championship") return t.is_championship_part;
      return true;
    });

  const latestHistory = (history || [])
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <section>
          <h2 className="text-3xl font-semibold">Welcome back 🎯</h2>
          <p className="text-sm text-gray-600 mt-2">
            You have{" "}
            <span className="font-medium text-yellow-600">
              {Object.values(allScores)
                .flat()
                .filter((s) => s.status === "pending").length}
            </span>{" "}
            pending scores across{" "}
            <span className="font-medium text-green-600">
              {tournaments.length}
            </span>{" "}
            tournaments.
          </p>
        </section>

        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h3 className="text-xl font-bold">🏹 Tournaments</h3>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search name..."
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

              <input
                type="text"
                placeholder="Search year (e.g. 2024)"
                value={yearQuery}
                onChange={(e) => setYearQuery(e.target.value)}
                className="px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Search region..."
                value={regionQuery}
                onChange={(e) => setRegionQuery(e.target.value)}
                className="px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
              />

              {["All", "Championship"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTournamentFilter(filter)}
                  className={`px-3 py-1 text-sm rounded-md border transition ${
                    tournamentFilter === filter
                      ? "bg-blue-600 text-white border-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredTournaments.map((t) => {
              const pendingCount = (allScores[t.competition_id] || []).filter(
                (s) => s.status === "pending"
              ).length;

              return (
                <div
                  key={t.competition_id}
                  className="bg-white p-5 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-800">{t.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-3">
                        📍 {t.location}
                        <span>•</span>
                        📅 {new Date(t.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        Created by:{" "}
                        <span className="font-medium text-gray-600">{t.created_by}</span>
                      </div>
                      {t.is_championship_part && (
                        <span className="mt-1 inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                          🏆 Championship Event
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onEnterTournament(t.competition_id)}
                      className="px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition"
                    >
                      Enter →
                    </button>
                  </div>

                  {/* ✅ Pending score count */}
                  {pendingCount > 0 && (
                    <div className="mt-3 text-sm text-gray-700 border-t pt-2">
                      Pending Scores:{" "}
                      <span className="font-semibold text-yellow-600">{pendingCount}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4">📜 Latest Submissions</h3>
          <div className="space-y-3">
            {latestHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                    {item.archer
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {item.archer}
                    </div>
                    <div className="text-sm text-gray-500">
                      Score: <span className="font-semibold">{item.score}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status === "approved" ? "Approved" : "Pending"}
                  </span>

                  <button
                    onClick={() => onDisapproveScore(item.id)}
                    className="px-3 py-1 text-sm rounded-md border border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Disapprove
                  </button>

                  <button
                    onClick={() => onEnterScore(item.id)}
                    className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Enter
                  </button>
                </div>
              </div>
            ))}

            {latestHistory.length === 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm text-gray-600">
                No history entries yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default RecorderDashboardUI;