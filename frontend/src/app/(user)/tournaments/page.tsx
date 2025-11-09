"use client";

import { useState, useEffect } from "react";
import TournamentFilter from "@/src/component/tournamentsFilter";
import TournamentList from "@/src/component/tournamentsList";
import { tournaments } from "@/src/_data/tournaments";



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
    <main className="min-h-screen text-gray-900 p-6">
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
