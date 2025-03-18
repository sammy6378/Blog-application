import React from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';

function Page() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Sam Smith', email: 'sam@example.com', role: 'user' },
  ];

  return (
    <div className="p-8">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-3 border">ID</th>
            <th className="px-4 py-3 border">Name</th>
            <th className="px-4 py-3 border">Email</th>
            <th className="px-4 py-3 border">Role</th>
            <th className="px-4 py-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-800">
              <td className="px-4 py-3 border">{user.id}</td>
              <td className="px-4 py-3 border">{user.name}</td>
              <td className="px-4 py-3 border">{user.email}</td>
              <td className="px-4 py-3 border">{user.role}</td>
              <td className="px-4 py-3 border flex justify-between items-center">
                <button className="text-blue-500 hover:text-blue-700">
                  <PencilIcon size={18} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <TrashIcon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;