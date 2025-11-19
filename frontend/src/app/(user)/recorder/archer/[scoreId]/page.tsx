//frontend\src\app\(user)\recorder\archer\[scoreId]\page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { scoresApi } from "@/src/api/scoresApi";

export default function ArcherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const scoreId = Number(params.scoreId);

  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<any>(null);
  const [error, setError] = useState("");

  // -----------------------------
  // FETCH SCORE FROM API
  // -----------------------------
  useEffect(() => {
    async function loadScore() {
      try {
        const data = await scoresApi.get(scoreId); // <---- your API
        setScore(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load score from server");
      } finally {
        setLoading(false);
      }
    }

    loadScore();
  }, [scoreId]);

  // -----------------------------
  // APPROVE / REJECT
  // -----------------------------
  const handleApprove = async () => {
    try {
      await scoresApi.approve(scoreId);  // <---- your API
      router.push("/recorder");
    } catch (err) {
      console.error(err);
      alert("Failed to approve score");
    }
  };

  const handleReject = async () => {
    try {
      await scoresApi.reject(scoreId);  // <---- your API
      router.push("/recorder");
    } catch (err) {
      console.error(err);
      alert("Failed to reject score");
    }
  };

  // -----------------------------
  // LOADING / ERROR
  // -----------------------------
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center">{error}</div>;
  if (!score) return <div className="p-6 text-center">Score not found.</div>;

  // -----------------------------
  // CALCULATE TOTAL SCORE
  // -----------------------------
  const totalScore =
    score.lines?.reduce(
      (sum: number, line: any) => sum + Number(line.arrow_score),
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
        {score.archer_name} – {score.bow_type}
      </h2>

      <p className="text-gray-600 mb-1">
        Competition:{" "}
        <span className="font-medium">{score.competition_name}</span>
      </p>

      <p className="text-gray-800 mt-2 font-semibold">
        Total Score: {totalScore}
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">End</th>
              <th className="px-3 py-2 border">Arrow</th>
              <th className="px-3 py-2 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {score.lines?.map((line: any, i: number) => (
              <tr key={i}>
                <td className="px-3 py-2 border text-center">{line.end_id}</td>
                <td className="px-3 py-2 border text-center">
                  {line.arrow_number}
                </td>
                <td className="px-3 py-2 border text-center">
                  {line.arrow_score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleApprove}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Approve
        </button>

        <button
          onClick={handleReject}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
