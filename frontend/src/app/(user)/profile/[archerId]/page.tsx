"use client";

import { useParams } from "next/navigation"; //this part is just temporary code

export default function ArcherProfilePage() {
  const { archerId } = useParams();

  // Simulated data — later you can fetch this from API
  const archer = {
    fullName: "Alice Nguyen",
    category: "Female Open Compound",
    dob: "1997-05-21",
    memberSince: "2022",
    club: "Melbourne Archery Club",
    photo: "/placeholder.jpg", // replace with real image
  };

    return (
    <div className="min-h-screen bg-[#E3FFE4] flex flex-col items-center py-10 px-6">
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
              {archer.fullName}
            </p>
            <p>
              <span className="font-semibold text-green-700">Category:</span>{" "}
              {archer.category}
            </p>
            <p>
              <span className="font-semibold text-green-700">Date of Birth:</span>{" "}
              {archer.dob}
            </p>
            <p>
              <span className="font-semibold text-green-700">Member Since:</span>{" "}
              {archer.memberSince}
            </p>
            <p>
              <span className="font-semibold text-green-700">Club:</span>{" "}
              {archer.club}
            </p>
            <p className="text-sm text-gray-500 italic">
              Archer ID: {archerId}
            </p>
          </div>

          {/* Photo Placeholder */}
          <div className="w-40 h-40 bg-green-50 border border-green-300 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            Photo
          </div>
        </div>
      </div>

      {/* Personal Performance Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">
          Personal Performance
        </h2>
        <div className="border-b-4 border-green-600 w-48 mx-auto mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Best Scores */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">
              Best Scores
            </h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>1 score</li>
              <li>2 score</li>
              <li>3 score</li>
              <li>4 score</li>
              <li>5 score — <a href="#" className="text-blue-600 underline">Tournament</a></li>
            </ul>
          </div>

          {/* Recent Tournaments */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">
              Recent Tournaments
            </h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>1 score</li>
              <li>2 score</li>
              <li>3 score</li>
              <li>4 score</li>
              <li>5 score — <a href="#" className="text-blue-600 underline">Tournament</a></li>
            </ul>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">
              Achievements
            </h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>2023 Regional Champion</li>
              <li>Top 10 Nationals</li>
              <li>Best Compound Archer</li>
              <li>2x Gold Medalist</li>
              <li><a href="#" className="text-blue-600 underline">More...</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}