"use client";

export function ManagerUserTable() {
  const users = [
    { id: 1, name: "Alice Nguyen", email: "alice@mail.com", role: "Archer" },
    { id: 2, name: "James Lee", email: "james@mail.com", role: "Recorder" },
    { id: 3, name: "Sarah Kim", email: "sarah@mail.com", role: "Manager" },
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Email</th>
            <th className="py-2 px-3">Role</th>
            <th className="py-2 px-3">Status</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-3">{u.name}</td>
              <td className="py-2 px-3">{u.email}</td>
              <td className="py-2 px-3">{u.role}</td>
              <td className="py-2 px-3 text-green-700">Active</td>
              <td className="py-2 px-3">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
