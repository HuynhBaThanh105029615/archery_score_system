"use client";

import { useState, useEffect } from "react";
import CompetitionFilter from "@/src/component/CompetitionFilter";
import CompetitionList from "@/src/component/CompetitionList";
import { competitionsApi } from "@/src/api";
import type { Competition } from "@/src/api/types";

export interface CompetitionItem {
  id: number;
  name: string;
  date: string;
  location: string;
  is_championship_part: boolean;
  original: Competition;
}

export default function CompetitionsPage() {
  const [items, setItems] = useState<CompetitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterValue, setFilterValue] = useState("All");

  // -------------------------------
  // LOAD COMPETITIONS (CLIENT ONLY)
  // -------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const data = await competitionsApi.list(); // axios GET /competitions

        const mapped: CompetitionItem[] = data.map((c) => ({
          id: c.competition_id ?? 0,
          name: c.name,
          date: c.date,
          location: c.location ?? "",
          is_championship_part: !!c.is_championship_part,
          original: c,
        }));

        setItems(mapped);
      } catch (err) {
        console.error("Failed to load competitions", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // FILTER LIST
  const filtered = items
    .filter((c) =>
      c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((c) =>
      filterValue === "Championship" ? c.is_championship_part : true
    );

  return (
    <main className="min-h-screen text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">🏹 Competitions</h2>

        <CompetitionFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          competitionFilter={filterValue}         // ✔ correct prop name
          setCompetitionFilter={setFilterValue}   // ✔ correct prop name
        />


        {loading ? (
          <p className="text-gray-500">Loading competitions...</p>
        ) : (
          <CompetitionList competitions={filtered} /> // 🟢 FIXED prop name
        )}
      </div>
    </main>
  );
}
