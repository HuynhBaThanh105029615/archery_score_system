"use client";

import { tournaments } from "@/src/_data/tournaments";

export const CompetitionsTable = () => {
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
          {tournaments.map((tournament) => (
            <tr key={tournament.competition_id} className="border-b hover:bg-green-50">
              <td className="py-2 px-3">{tournament.name}</td>
              <td className="py-2 px-3">{tournament.date}</td>
              <td className="py-2 px-3">{tournament.location}</td>
              <td className="py-2 px-3">{tournament.created_by}</td>
              <td className="py-2 px-3">
                {tournament.is_championship_part ? (
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
