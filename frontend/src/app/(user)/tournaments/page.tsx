"use client";

import { useState, useEffect } from "react";
import { TournamentItem } from "@/src/component/RecorderDashboardUI";
import TournamentFilter from "@/src/component/tournamentsFilter";
import TournamentList from "@/src/component/tournamentsList";

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
    .filter((t) => (tournamentFilter === "Championship" ? t.is_championship_part : true));

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">🏹 Tournaments</h2>

        <TournamentFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tournamentFilter={tournamentFilter}
          setTournamentFilter={setTournamentFilter}
        />

        <TournamentList tournaments={filteredTournaments} />
      </div>
    </main>
  );
}
