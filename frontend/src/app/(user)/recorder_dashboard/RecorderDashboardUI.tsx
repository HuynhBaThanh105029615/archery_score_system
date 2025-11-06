"use client";

import { FC } from "react";

export interface TournamentItem {
  id: number;
  name: string;
  submissions: number;
  archers: number;
}

export interface ScoreItem {
  id: number;
  archer: string;
  score: number;
  status: "pending" | "approved";
}

interface Props {
  tournaments: TournamentItem[];
  history: ScoreItem[];
  onEnterTournament: (id: number) => void;
  onDisapproveScore: (id: number) => void;
  onEnterScore: (id: number) => void;
}

const RecorderDashboardUI: FC<Props> = ({
  tournaments,
  history,
  onEnterTournament,
  onDisapproveScore,
  onEnterScore,
}) => (
  <main className="p-6">
    <h2 className="text-2xl font-bold mb-4">Welcome back 🎯</h2>

    <section className="space-y-3">
      {tournaments.map(t => (
        <div key={t.id} className="bg-white p-4 rounded shadow flex justify-between">
          <span>{t.name} — {t.submissions} submissions</span>
          <button onClick={() => onEnterTournament(t.id)}>Enter →</button>
        </div>
      ))}
    </section>
  </main>
);

export default RecorderDashboardUI;
