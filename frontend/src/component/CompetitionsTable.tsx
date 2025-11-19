"use client";

import { useEffect, useState } from "react";
import { competitionsApi } from "@/src/api";
import type { Competition } from "@/src/api/types";

export const CompetitionsTable = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await competitionsApi.list(); // backend request
        setCompetitions(data);
      } catch (err) {
        console.error("Failed to load competitions:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
        <p className="text-gray-600">Loading competitions...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
      <h2 className="text-xl font-semibold mb-4 text-green-700">Competitions</h2>

      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="py-2 px-3 text-left">Name</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Location</th>
            <th className="py-2 px-3 text-left">Created By</th>
            <th className="py-2 px-3 text-left">Championship</th>
          </tr>
        </thead>

        <tbody>
          {competitions.map((comp) => (
            <tr
              key={comp.competition_id}
              className="border-b hover:bg-green-50"
            >
              <td className="py-2 px-3">{comp.name}</td>

              <td className="py-2 px-3">
                {new Date(comp.date).toLocaleDateString()}
              </td>

              <td className="py-2 px-3">{comp.location ?? "—"}</td>

              <td className="py-2 px-3">{comp.created_by ?? "—"}</td>

              <td className="py-2 px-3">
                {comp.is_championship_part ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  "No"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
