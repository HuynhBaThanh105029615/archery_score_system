"use client";

import React from "react";
import { Check, X as XIcon } from "lucide-react";
import type { ScoreItem } from "@/src/component/RecorderDashboardUI";

interface Props {
  tournamentName: string;
  scores: ScoreItem[]; // full ScoreItem objects for that tournament
  onApprove: (id: number) => void;
  onDisapprove: (id: number) => void;
}

export default function RecorderTournamentUI({
  tournamentName,
  scores,
  onApprove,
  onDisapprove,
}: Props) {
  // Only pending scores by default (you can change if want to show approved too)
  const pendingScores = (scores || []).filter((s) => s.status === "pending");

  // Determine how many rounds and max shots per round to render columns dynamically
  const rounds = pendingScores
    .flatMap((s) => (s.details || []).map((d) => d.round))
    .filter((v, i, arr) => arr.indexOf(v) === i) // unique rounds
    .sort((a, b) => a - b);

  // For each round number, compute max shots across all scores (some rounds may have different shot counts)
  const maxShotsPerRound = new Map<number, number>();
  rounds.forEach((r) => {
    const maxShots = Math.max(
      0,
      ...pendingScores.map((s) => {
        const d = s.details?.find((dd) => dd.round === r);
        return d ? d.shots.length : 0;
      })
    );
    maxShotsPerRound.set(r, maxShots);
  });

  // Helper to get round detail for a score
  const getRound = (s: ScoreItem, round: number) =>
    s.details?.find((d) => d.round === round) ?? null;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🏆 {tournamentName}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Pending submissions:{" "}
              <span className="font-semibold text-yellow-600">
                {pendingScores.length}
              </span>
            </p>
          </div>
        </header>

        <section className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full table-auto">
            {/* Top header: fixed columns + one group per round + total + status + actions */}
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-700">
                <th className="px-3 py-2 border text-left">Archer</th>
                <th className="px-3 py-2 border text-left">Bow</th>
                <th className="px-3 py-2 border text-left">Submitted</th>

                {/* For each round: create a colspan = maxShots + 2 (Range + Round Total) */}
                {rounds.map((r) => {
                  const maxShots = maxShotsPerRound.get(r) || 0;
                  const colspan = maxShots + 2; // Range + shots + Round Total
                  return (
                    <th
                      key={r}
                      className="px-3 py-2 border text-center"
                      colSpan={colspan}
                    >
                      Round {r}
                    </th>
                  );
                })}

                <th className="px-3 py-2 border text-center">Total</th>
                <th className="px-3 py-2 border text-center">Status</th>
                <th className="px-3 py-2 border text-center">Actions</th>
              </tr>

              {/* Sub-header: for each round, show Range | Shot1..ShotN | Round Total */}
              <tr className="bg-gray-50 text-xs text-gray-600">
                {/* placeholders for first 3 fixed columns */}
                <th className="px-3 py-2 border"></th>
                <th className="px-3 py-2 border"></th>
                <th className="px-3 py-2 border"></th>

                {rounds.map((r) => {
                  const maxShots = maxShotsPerRound.get(r) || 0;
                  return (
                    <React.Fragment key={`sub-${r}`}>
                      <th className="px-2 py-2 border text-center">Range</th>
                      {Array.from({ length: maxShots }).map((_, i) => (
                        <th key={`r${r}-s${i}`} className="px-2 py-2 border text-center">
                          S{i + 1}
                        </th>
                      ))}
                      <th className="px-2 py-2 border text-center">Round Total</th>
                    </React.Fragment>
                  );
                })}

                <th className="px-3 py-2 border"></th>
                <th className="px-3 py-2 border"></th>
                <th className="px-3 py-2 border"></th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {pendingScores.map((s) => {
                // compute per-round totals and grand total
                const roundTotals = (s.details || []).reduce<Record<number, number>>(
                  (acc, d) => {
                    acc[d.round] = d.shots.reduce((a, b) => a + b, 0);
                    return acc;
                  },
                  {}
                );
                const grandTotal = Object.values(roundTotals).reduce((a, b) => a + b, 0) || s.total_score || 0;

                return (
                  <tr key={s.id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 py-3 border">
                      <div className="font-medium">{s.archer}</div>
                      <div className="text-xs text-gray-500">{s.tournament_name}</div>
                    </td>

                    <td className="px-3 py-3 border">{s.bow_type}</td>

                    <td className="px-3 py-3 border text-xs text-gray-500">
                      {new Date(s.submitted_at).toLocaleString()}
                    </td>

                    {rounds.map((r) => {
                      const rd = getRound(s, r);
                      const maxShots = maxShotsPerRound.get(r) || 0;

                      return (
                        <React.Fragment key={`row-${s.id}-r${r}`}>
                          <td className="px-2 py-2 border text-center text-xs">
                            {rd ? rd.range : "-"}
                          </td>

                          {/* show each shot or blank if not provided */}
                          {Array.from({ length: maxShots }).map((_, i) => (
                            <td key={`row-${s.id}-r${r}-s${i}`} className="px-2 py-2 border text-center">
                              {rd && rd.shots[i] !== undefined ? rd.shots[i] : "-"}
                            </td>
                          ))}

                          <td className="px-2 py-2 border text-center font-semibold">
                            {rd ? rd.shots.reduce((a, b) => a + b, 0) : "-"}
                          </td>
                        </React.Fragment>
                      );
                    })}

                    <td className="px-3 py-3 border text-center font-semibold">{grandTotal}</td>

                    <td className="px-3 py-3 border text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          s.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    <td className="px-3 py-3 border text-center space-x-2">
                      <button
                        onClick={() => onApprove(s.id)}
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                        title="Approve"
                      >
                        <Check size={16} />
                        Approve
                      </button>

                      <button
                        onClick={() => onDisapprove(s.id)}
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md border border-red-400 text-red-600 hover:bg-red-50"
                        title="Disapprove"
                      >
                        <XIcon size={16} />
                        Disapprove
                      </button>
                    </td>
                  </tr>
                );
              })}

              {pendingScores.length === 0 && (
                <tr>
                  <td colSpan={3 + rounds.reduce((acc, r) => acc + (maxShotsPerRound.get(r) || 0) + 2, 0) + 3} className="px-4 py-8 text-center text-gray-500">
                    No pending submissions for this tournament.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
