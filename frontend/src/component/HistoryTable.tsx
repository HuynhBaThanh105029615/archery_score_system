"use client";

export function HistoryTable() {
  const history = [
    { id: 1, action: "Approved scores", date: "2025-03-01", by: "Manager" },
    { id: 2, action: "Created competition", date: "2025-03-02", by: "James Lee" },
    { id: 3, action: "Removed user", date: "2025-03-03", by: "Admin" },
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-2 px-3">Action</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Performed By</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-3">{h.action}</td>
              <td className="py-2 px-3">{h.date}</td>
              <td className="py-2 px-3">{h.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
