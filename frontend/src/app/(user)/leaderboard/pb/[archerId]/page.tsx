"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { leaderboardApi, competitionsApi, divisionApi } from "@/src/api";

interface PersonalBestRow {
  competition_id: number;
  competition_name: string;
  total: number;
  division_id: number | null;
  date: string;
}

export default function ArcherPersonalBestPage() {
  const { archerId } = useParams();
  const id = Number(archerId);

  const [rows, setRows] = useState<PersonalBestRow[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [divs, pb] = await Promise.all([
          divisionApi.list(),
          leaderboardApi.personalBest(id),
        ]);

        setDivisions(divs ?? []);
        setRows(pb ?? []);
      } catch (err) {
        console.error("Failed loading personal best:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

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

        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          🏹 Archer Personal Best
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="text-center text-gray-600">No results found.</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-x-auto border border-green-200">
            <table className="min-w-full">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-3 text-left">Competition</th>
                  <th className="p-3 text-left">Division</th>
                  <th className="p-3 text-left">Score</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.competition_id} className="border-t hover:bg-green-50">
                    <td className="p-3">{row.competition_name}</td>
                    <td className="p-3">{getDivisionName(row.division_id)}</td>
                    <td className="p-3 font-bold text-green-700">{row.total}</td>
                    <td className="p-3">
                      {new Date(row.date).toLocaleDateString()}
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
