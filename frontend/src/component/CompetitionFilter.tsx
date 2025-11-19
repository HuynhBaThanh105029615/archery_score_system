"use client";

import { Search, X } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  competitionFilter: string;
  setCompetitionFilter: (value: string) => void;
}

export default function CompetitionFilter({
  searchQuery,
  setSearchQuery,
  competitionFilter,
  setCompetitionFilter,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      {/* Search Input */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          placeholder="Search competitions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-9 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Championship"].map((f) => (
          <button
            key={f}
            onClick={() => setCompetitionFilter(f)}
            className={`px-3 py-2 rounded-md text-sm border ${
              competitionFilter === f
                ? "bg-blue-600 text-white border-blue-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
