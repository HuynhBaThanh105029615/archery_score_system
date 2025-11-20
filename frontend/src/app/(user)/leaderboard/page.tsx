"use client";

import { useEffect, useState } from "react";
import { leaderboardApi, divisionApi, competitionsApi } from "@/src/api";

interface LeaderboardRow {
  archer_id: number;
  archer_name: string;
  division_id: number | null;
  division_name?: string;
  total: number;
}

export default function LeaderboardPage() {
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [filterDivision, setFilterDivision] = useState("All");
  const [filterCompetition, setFilterCompetition] = useState<number | "All">("All");

  const [loading, setLoading] = useState(true);

  // Load divisions + competitions + default leaderboard
  useEffect(() => {
    async function loadAll() {
      setLoading(true);

      try {
        const [divs, comps, overall] = await Promise.all([
          divisionApi.list(),
          competitionsApi.list(),
          leaderboardApi.overall(),
        ]);

        setDivisions(divs ?? []);
        setCompetitions(comps ?? []);
        setRows(overall ?? []);
      } catch (err) {
        console.error("Failed loading leaderboard", err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  // -------------------------------------------------------
  // FILTER: DIVISION & COMPETITION
  // -------------------------------------------------------
  const filteredRows = rows.filter((r) => {
    const divMatches =
      filterDivision === "All" || r.division_id === Number(filterDivision);

    return divMatches;
  });

  // Handle competition change
  async function handleCompetitionChange(value: string) {
    setFilterCompetition(value as any);

    if (value === "All") {
      // Reload overall leaderboard
      const data = await leaderboardApi.overall();
      setRows(data);
    } else {
      const data = await leaderboardApi.competition(Number(value));
      setRows(data);
    }
  }

  // Get division name
  const getDivisionName = (division_id: number | null) => {
    return (
      divisions.find((d) => d.division_id === division_id)?.division_name ??
      "Unknown"
    );
  };

  return (
    <div className="min-h-screen p-8 bg-[#E3FFE4]">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">
          🏆 Leaderboard
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Filter by Competition */}
          <select
            className="px-4 py-2 rounded-md border border-green-300 bg-white"
            value={filterCompetition}
            onChange={(e) => handleCompetitionChange(e.target.value)}
          >
            <option value="All">All Competitions</option>
            {competitions.map((c) => (
              <option key={c.competition_id} value={c.competition_id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Filter by Division */}
          <select
            className="px-4 py-2 rounded-md border border-green-300 bg-white"
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
          >
            <option value="All">All Divisions</option>
            {divisions.map((d) => (
              <option key={d.division_id} value={d.division_id}>
                {d.division_name}
              </option>
            ))}
          </select>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <p className="text-center text-gray-600">Loading leaderboard...</p>
        ) : filteredRows.length === 0 ? (
          <p className="text-center text-gray-600">No results found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-green-200">
            <table className="min-w-full">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Archer</th>
                  <th className="p-3 text-left">Division</th>
                  <th className="p-3 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr
                    key={row.archer_id}
                    className="border-t hover:bg-green-50 transition"
                  >
                    <td className="p-3 font-semibold">{index + 1}</td>
                    <td className="p-3">{row.archer_name}</td>
                    <td className="p-3">{getDivisionName(row.division_id)}</td>
                    <td className="p-3 font-bold text-green-700">
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
