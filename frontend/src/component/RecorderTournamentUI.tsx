"use client";

import { FC, useState, useMemo } from "react";
import { Search, X } from "lucide-react";

interface ArcherScore {
  id: number;
  archer: string;
  score: number;
  category: string;
}

interface Props {
  tournamentName: string;
  scores: ArcherScore[];
  onApprove: (id: number) => void;
  onDisapprove: (id: number) => void;
}

const RecorderTournamentUI: FC<Props> = ({
  tournamentName,
  scores,
  onApprove,
  onDisapprove,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // ✅ Filter logic
  const filteredScores = useMemo(() => {
    return (scores || [])
      .filter((s) =>
        s.archer.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((s) =>
        categoryFilter === "All" ? true : s.category === categoryFilter
      );
  }, [scores, searchQuery, categoryFilter]);

  // ✅ Unique categories for dropdown
  const categories = useMemo(() => {
    const unique = Array.from(new Set(scores.map((s) => s.category)));
    return ["All", ...unique];
  }, [scores]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          🏹 {tournamentName}
        </h1>

        {/* ✅ Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search archer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-2 px-3 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* ✅ Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="py-3 px-4 text-left font-medium">Archer</th>
                <th className="py-3 px-4 text-left font-medium">Score</th>
                <th className="py-3 px-4 text-left font-medium">Category</th>
                <th className="py-3 px-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.length > 0 ? (
                filteredScores.map((s, index) => (
                  <tr
                    key={s.id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {s.archer}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{s.score}</td>
                    <td className="py-3 px-4 text-gray-700">{s.category}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => onApprove(s.id)}
                          className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition active:scale-95"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onDisapprove(s.id)}
                          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition active:scale-95"
                        >
                          Disapprove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-8 text-gray-500 italic"
                  >
                    No matching archers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default RecorderTournamentUI;