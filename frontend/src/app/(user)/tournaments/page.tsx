"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { TournamentItem } from "@/src/component/RecorderDashboardUI";

// Mock data for tournaments (copy from RecorderProfilePage)
const tournaments: TournamentItem[] = [
  { competition_id: 1, name: "Regional Open 2025", date: "2025-03-14", location: "New York, USA", is_championship_part: false, created_by: "Admin James" },
  { competition_id: 2, name: "City Classic", date: "2025-04-02", location: "Los Angeles, USA", is_championship_part: false, created_by: "Admin Sarah" },
  { competition_id: 3, name: "Spring Invitational", date: "2025-05-08", location: "Chicago, USA", is_championship_part: true, created_by: "Admin Kevin" },
  { competition_id: 4, name: "Summer Cup", date: "2025-06-20", location: "Houston, USA", is_championship_part: false, created_by: "Admin David" },
  { competition_id: 5, name: "National Qualifier", date: "2025-07-12", location: "Miami, USA", is_championship_part: true, created_by: "Admin Olivia" },
];

export default function TournamentListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tournamentFilter, setTournamentFilter] = useState("All");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredTournaments = tournaments
    .filter((t) => t.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter((t) => {
      if (tournamentFilter === "Championship") return t.is_championship_part;
      return true;
    });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">🏹 Tournaments</h2>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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

          <div className="flex gap-2 flex-wrap">
            {["All", "Championship"].map((f) => (
              <button
                key={f}
                onClick={() => setTournamentFilter(f)}
                className={`px-3 py-2 rounded-md text-sm border ${
                  tournamentFilter === f
                    ? "bg-blue-600 text-white border-blue-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tournament List */}
        {filteredTournaments.length === 0 && (
          <div className="text-center text-gray-500 bg-gray-100 px-6 py-10 rounded-lg">
            No tournaments found.
          </div>
        )}

        {filteredTournaments.map((t) => (
          <div
            key={t.competition_id}
            className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition mb-4"
          >
            <div className="space-y-1">
              <div className="font-semibold text-gray-800">{t.name}</div>
              <div className="text-sm text-gray-500">
                📍 {t.location} • 📅 {new Date(t.date).toLocaleDateString()}
              </div>
              {t.is_championship_part && (
                <span className="mt-1 inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  🏆 Championship Event
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
