"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { leaderboardApi, divisionApi, competitionsApi } from "@/src/api";

interface LeaderboardRow {
  archer_id: number;
  archer_name: string;
  division_id: number | null;
  total: number;
}

export default function CompetitionLeaderboardPage() {
  const { id } = useParams();
  const competitionId = Number(id);

  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [competition, setCompetition] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [divs, comp, scores] = await Promise.all([
          divisionApi.list(),
          competitionsApi.get(competitionId),
          leaderboardApi.competition(competitionId),
        ]);

        setDivisions(divs ?? []);
        setCompetition(comp ?? null);
        setRows(scores ?? []);
      } catch (err) {
        console.error("Failed to load competition leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }

    if (competitionId) load();
  }, [competitionId]);

  const getDivisionName = (division_id: number | null) => {
    return (
      divisions.find((d) => d.division_id === division_id)?.division_name ??
      "Unknown"
    );
  };

  return (
    <div className="min-h-screen p-8 bg-[#E3FFE4]">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => history.back()}
          className="px-4 py-2 mb-4 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center text-green-800 mb-4">
          🏆 Competition Leaderboard
        </h1>

        {competition && (
          <p className="text-center text-lg text-gray-700 mb-6">
            {competition.name} •{" "}
            {new Date(competition.date).toLocaleDateString()}
          </p>
        )}

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="text-center text-gray-600">No scores yet.</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-x-auto border border-green-200">
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
                {rows.map((row, index) => (
                  <tr key={row.archer_id} className="border-t hover:bg-green-50">
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
