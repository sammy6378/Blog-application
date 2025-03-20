"use client"

import React from 'react'
import { Menu } from 'lucide-react'

function MobileNav({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className='flex items-center justify-between h-16 px-4 bg-gray-900 text-white md:hidden'>
        <div className='text-2xl font-bold'>Bloogify</div>
        <button onClick={() => setIsOpen(true)}>
          <Menu className='w-6 h-6' />
        </button>
      </div>
  )
}

export default MobileNav