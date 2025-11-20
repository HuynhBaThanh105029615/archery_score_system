"use client";

import { useEffect, useState } from "react";
import { recorderApi } from "@/src/api/recorderApi";

export function ManagerUserTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await recorderApi.list();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load recorders:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="bg-white border rounded-lg shadow p-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Role</th>
            <th className="px-3 py-2">Created At</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.recorder_id} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2">{u.name}</td>
              <td className="px-3 py-2">{u.email}</td>
              <td className="px-3 py-2">{u.role}</td>
              <td className="px-3 py-2">
                {new Date(u.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
