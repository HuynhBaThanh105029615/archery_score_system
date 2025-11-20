"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { archersApi, divisionApi, scoresApi, competitionsApi } from "@/src/api";
import { ArcherCard } from "@/src/component/archercard";
import CompetitionFilter from "@/src/component/CompetitionFilter";
import CompetitionList from "@/src/component/CompetitionList";

interface ArcherProfilePageProps {
  user: {
    id: number;
    name: string;
    role: string;
  };
}

export function ArcherProfilePage({ user }: ArcherProfilePageProps) {
  const { id } = useParams(); // archer_id from route

  const [archer, setArcher] = useState<any>(null);
  const [divisionName, setDivisionName] = useState<string>("Unknown");
  const [scores, setScores] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tournamentFilter, setTournamentFilter] = useState("All");

  // ---------------------------------------------------
  // DEBOUNCE SEARCH
  // ---------------------------------------------------
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ---------------------------------------------------
  // LOAD ALL ARCHER DATA FROM API
  // ---------------------------------------------------
  useEffect(() => {
    async function loadAll() {
      try {
        // 1) Load archer profile
        const archerData = await archersApi.get(Number(id));
        setArcher(archerData);

        // 2) Load division (bow type)
        if (archerData.default_division_id) {
          const division = await divisionApi.get(archerData.default_division_id);
          setDivisionName(division.name);
        }

        // 3) Load archer scores
        const scoreData = await scoresApi.list({ archer_id: archerData.archer_id });
        setScores(scoreData);

        // 4) Load tournaments (competitions)
        const compData = await competitionsApi.list();
        setTournaments(compData);
      } catch (err) {
        console.error("Failed loading archer page:", err);
      }
    }

    loadAll();
  }, [id]);

  if (!archer) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ---------------------------------------------------
  // BEST SCORES (Top 5)
  // ---------------------------------------------------
  const bestScores = [...scores]
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((s) => ({
      text: `${s.total} points – ${s.date || s.created_at}`,
    }));

  // ---------------------------------------------------
  // RECENT TOURNAMENTS
  // ---------------------------------------------------
  const recentTournaments = scores
    .slice(0, 5)
    .map((s) => ({
      text: `${s.total} points – Competition #${s.competition_id}`,
    }));

  // ---------------------------------------------------
  // ACHIEVEMENTS (Auto-generated placeholders)
  // ---------------------------------------------------
  const achievements = [
    { text: `Highest score: ${bestScores[0]?.text || "N/A"}` },
    { text: `Total competitions: ${scores.length}` },
    { text: `Active since ${archer.created_at?.slice(0, 4)}` },
    { text: "More achievements coming soon..." },
  ];

  // ---------------------------------------------------
  // FILTER TOURNAMENT LIST
  // ---------------------------------------------------
  const filteredTournaments = tournaments
    .filter((t) =>
      t.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((t) =>
      tournamentFilter === "Championship" ? t.is_championship_part : true
    );

  return (
    <div className="min-h-screen bg-[#E3FFE4] flex flex-col items-center py-10 px-6">
      {/* Leaderboard Button */}
      <div className="flex justify-end w-full max-w-5xl mx-auto mb-6">
        <button
          onClick={() => window.location.href = "/leaderboard"}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Leaderboard
        </button>
      </div>

      {/* Profile Overview */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-green-200 p-8 mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Profile Overview
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Info Section */}
          <div className="flex-1 space-y-3 text-gray-800">
            <p>
              <span className="font-semibold text-green-700">Full Name:</span>{" "}
              {archer.name}
            </p>

            <p>
              <span className="font-semibold text-green-700">Bow Type:</span>{" "}
              {divisionName}
            </p>

            <p>
              <span className="font-semibold text-green-700">Date of Birth:</span>{" "}
              {archer.date_of_birth || "N/A"}
            </p>

            <p>
              <span className="font-semibold text-green-700">Member Since:</span>{" "}
              {archer.created_at?.slice(0, 4) || "N/A"}
            </p>

            <p className="text-sm text-gray-500 italic">
              Archer ID: {archer.archer_id}
            </p>
          </div>

          {/* Photo Placeholder */}
          <div className="w-40 h-40 bg-green-50 border border-green-300 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            Photo
          </div>
        </div>
      </div>

      {/* Personal Performance */}
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">
          Personal Performance
        </h2>
        <div className="border-b-4 border-green-600 w-48 mx-auto mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ArcherCard title="Best Scores" items={bestScores} />
          <ArcherCard title="Recent Tournaments" items={recentTournaments} />
          <ArcherCard title="Achievements" items={achievements} />
        </div>

        {/* Tournaments */}
        <h2 className="text-2xl font-bold text-green-800 mb-2 text-center mt-12">
          Tournaments
        </h2>
        <div className="border-b-4 border-green-600 w-48 mx-auto mb-10"></div>

        <div className="bg-white border border-green-200 shadow-md rounded-xl p-6">
          <CompetitionFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            competitionFilter={tournamentFilter}
            setCompetitionFilter={setTournamentFilter}
          />

          <CompetitionList competitions={filteredTournaments} />
        </div>
      </div>
    </div>
  );
}
