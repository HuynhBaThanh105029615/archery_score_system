"use client";

import { FC } from "react";
import { Clock } from "lucide-react"; // for icons

interface ManagerProfilePageProps {
  user: {
    id: number;
    name: string;
    role: string;
  };
}

export const ManagerProfilePage: FC<ManagerProfilePageProps> = ({ user }) => {
  // These can later be fetched from your backend
  const stats = [
    { id: 1, label: "Active users", value: 100 },
    { id: 2, label: "Tournaments Ongoing", value: 10 },
    { id: 3, label: "Tournaments Finished", value: 8 },
    { id: 4, label: "Pending results", value: 100 },
  ];

  const scoresToApprove = 25; // demo
  const totalTournaments = 12; // demo

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, <span className="text-green-700">“{user.name}”</span>
        </h1>
        <p className="text-gray-600 mb-8">
          You have <strong>{scoresToApprove}</strong> scores to approve from{" "}
          <strong>{totalTournaments}</strong> tournaments
        </p>

        {/* Stats section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center justify-center text-center border border-green-100 hover:shadow-md transition"
            >
              <Clock className="w-6 h-6 mb-2 text-green-600" />
              <h3 className="text-2xl font-semibold text-gray-800">
                {s.value}
              </h3>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};
