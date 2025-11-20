"use client";

import { useEffect, useState } from "react";
import { auditApi } from "@/src/api";

export function HistoryTable() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await auditApi.list({ limit: 100 });
        setHistory(data);
      } catch (err) {
        console.error("Failed to load audit history:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-4">Loading history...</div>;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-2 px-3">Action</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">User</th>
          </tr>
        </thead>

        <tbody>
          {history.map((h) => (
            <tr key={h.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-3">{h.action}</td>
              <td className="py-2 px-3">
                {new Date(h.created_at).toLocaleString()}
              </td>
              <td className="py-2 px-3">{h.user_name ?? "System"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
