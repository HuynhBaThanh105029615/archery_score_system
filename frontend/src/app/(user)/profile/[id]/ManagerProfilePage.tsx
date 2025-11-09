"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { ManagerUserTable } from "@/src/component/ManagerUserTable";
import { CompetitionsTable } from "@/src/component/CompetitionTable";
import { HistoryTable } from "@/src/component/HistoryTable";

export const ManagerProfilePage = ({ user }: { user: { id: number; name: string; role: string } }) => {
  const [activeTab, setActiveTab] = useState("users");

  const stats = [
    { id: 1, label: "Active users", value: 100 },
    { id: 2, label: "Tournaments Ongoing", value: 10 },
    { id: 3, label: "Tournaments Finished", value: 8 },
    { id: 4, label: "Pending results", value: 100 },
  ];

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, <span className="text-green-700">“{user.name}”</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your users, competitions, and tournament history here.
        </p>

        {/* Stats cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center justify-center text-center border border-green-100 hover:shadow-md transition"
            >
              <Clock className="w-6 h-6 mb-2 text-green-600" />
              <h3 className="text-2xl font-semibold text-gray-800">{s.value}</h3>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Toggle buttons */}
        <div className="flex gap-3 mb-6">
          {[
            { id: "users", label: "Manage Users" },
            { id: "competitions", label: "Competitions" },
            { id: "history", label: "History" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full border ${
                activeTab === tab.id
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
              } transition`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table content */}
        {activeTab === "users" && <ManagerUserTable />}
        {activeTab === "competitions" && <CompetitionsTable />}
        {activeTab === "history" && <HistoryTable />}
      </div>
    </main>
  );
};
