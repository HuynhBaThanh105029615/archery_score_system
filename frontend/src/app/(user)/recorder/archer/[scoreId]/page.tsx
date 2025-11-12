"use client";

import { useParams, useRouter } from "next/navigation";
import { allScores } from "@/src/_data/scores";
import { ScoreItem } from "@/src/component/RecorderDashboardUI";

export default function ArcherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const scoreId = Number(params.scoreId);

  const allScoreList: ScoreItem[] = Object.values(allScores).flat();
  const score = allScoreList.find((s) => s.id === scoreId);

  if (!score) return <div className="p-6 text-center">Score not found</div>;

  const handleApprove = () => {
    console.log("✅ Approved score:", score.id);
  };

  const handleDisapprove = () => {
    console.log("❌ Disapproved score:", score.id);
  };

  const totalScore =
    score.details?.reduce(
      (sum, round) => sum + round.shots.reduce((a, b) => a + b, 0),
      0
    ) ?? score.total_score;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-2">
        {score.archer} - {score.bow_type}
      </h2>
      <p className="text-gray-600 mb-1">
        Tournament: <span className="font-medium">{score.tournament_name}</span>
      </p>
      <p className="text-gray-600 mb-1">
        Submitted at: {new Date(score.submitted_at).toLocaleString()}
      </p>
      <p className="text-gray-800 mt-2 font-semibold">Total Score: {totalScore}</p>

      {score.details && (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Round</th>
                <th className="px-3 py-2 border">Range</th>
                {score.details[0].shots.map((_, i) => (
                  <th key={i} className="px-3 py-2 border">
                    Shot {i + 1}
                  </th>
                ))}
                <th className="px-3 py-2 border">Round Total</th>
              </tr>
            </thead>
            <tbody>
              {score.details.map((d, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 border text-center">{d.round}</td>
                  <td className="px-3 py-2 border text-center">{d.range}</td>
                  {d.shots.map((s, j) => (
                    <td key={j} className="px-3 py-2 border text-center">
                      {s}
                    </td>
                  ))}
                  <td className="px-3 py-2 border text-center font-semibold">
                    {d.shots.reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleApprove}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={handleDisapprove}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Disapprove
        </button>
      </div>
    </div>
  );
}
