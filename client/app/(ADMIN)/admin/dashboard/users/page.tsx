"use client"

import  {useState} from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { IAllUsers, IUserInfo, useContextFunc } from '@/components/context/AppContext';
import { updateUserRole } from '@/components/services/userService';

const Page = () => {
  const { allUsers }= useContextFunc();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [role, setRole] = useState("");


  const handleEditUser = (user:any) => {
    setSelectedUser(user);
    setRole(user.role);
    setIsFormVisible(true); // Show the form
  };

  // update selected user role
  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (!selectedUser) return;
  
    try {
      await updateUserRole(role, selectedUser.email);
      toast.success("User role updated successfully");
      setIsFormVisible(false); // Close modal after success
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

// const handleDeleteUser = (id:string) => {
//     const updatedUsers = allUsers?.filter((user: IUserInfo) => user._id !== id); // Filter out the user
//     if (updatedUsers) {
//       // Update the state or context with the filtered users
//       toast.success('User deleted successfully');
//     } else {
//       toast.error('Failed to delete user');
//     }
//     toast.success('User deleted successfully');
//   }; 

  return (
    <div className="p-8 mb-[80px] max-700:mb-[150px] overflow-x-auto">
      <table className="w-full rounded-lg">
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
          {(allUsers as unknown as IUserInfo[]) ?.map((user: IUserInfo, index: number) => (
            <tr key={user._id} className="border-t dark:hover:bg-gray-800 hover:bg-gray-100">
              <td className="px-4 py-3 border">{index + 1}</td>
              <td className="px-4 py-3 border">{user.name}</td>
              <td className="px-4 py-3 border">
                <a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td className="px-4 py-3 border">{user.role}</td>
              <td className="px-4 py-3 border">
                <div className='flex justify-between'>
                <button
                onClick={() => handleEditUser(user)}
                 className="text-blue-500 hover:text-blue-700">
                  <PencilIcon size={18}/>
                </button>
                <button 
                className="text-red-500 hover:text-red-700">
                  <TrashIcon size={18} />
                </button></div>
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
      <form onSubmit={handleUpdateRole}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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