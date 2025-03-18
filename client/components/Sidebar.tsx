import React from 'react'
import { Home, FileText, Users, Settings } from 'lucide-react'
import Link from 'next/Link'

function Sidebar() {
  return (
    <div className='dark:bg-gray-900 h-screen'>
      <div className='flex flex-col items-center justify-center h-16 bg-gray-900 text-white text-2xl font-bold'>Bloogify</div>
       <nav>
        <ul>
          <Link href={"/admin/dashboard"} className='p-4 hover:bg-gray-800 cursor-pointer flex items-center'>
            <Home className='mr-4' /> Dashboard
          </Link>
          <Link href={"/admin/dashboard/blogs"} className='p-4 hover:bg-gray-800 cursor-pointer flex items-center'>
            <FileText className='mr-4' /> Blogs
          </Link>
          <Link  href={"/admin/dashboard/users"} className='p-4 hover:bg-gray-800 cursor-pointer flex items-center'>
            <Users className='mr-4' /> Users
          </Link>
          <Link href={"/admin/dashboard/settings"} className='p-4 hover:bg-gray-800 cursor-pointer flex items-center'>
            <Settings className='mr-4' /> Settings
          </Link>
        </ul>
       </nav>
    </div>
  )
}

export default Sidebar