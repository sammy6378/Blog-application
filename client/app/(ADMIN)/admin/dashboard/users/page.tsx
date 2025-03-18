"use client"

import  {useState} from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface IUser{
  id: number;
  name: string;
  email: string;
  role: string;
}

const Page = () => {

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

    const [users, setUsers] = useState<IUser[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Sam Smith', email: 'sam@example.com', role: 'user' },
  ]);

 

  const handleEditUser = (user:IUser) => {
    setSelectedUser(user);
    setIsFormVisible(true); // Show the form
  };

  const handleDeleteUser = (id:number) => {
    setUsers(users.filter((user) => user.id !== id)); // Delete user
    toast.success('User deleted successfully');
  };

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
                <button
                onClick={() => handleEditUser(user)}
                 className="text-blue-500 hover:text-blue-700">
                  <PencilIcon size={18} />
                </button>
                <button 
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-500 hover:text-red-700">
                  <TrashIcon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          
           {/* Form Overlay */}
    {isFormVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center p-4 z-[10000]">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">
        {selectedUser ? "Edit user" : "Create User"}
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="Role"
            defaultValue={selectedUser ? selectedUser.role : ""}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
       
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {selectedUser ? "Save Changes" : "Create user"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      
    </div>
  );
}

export default Page;