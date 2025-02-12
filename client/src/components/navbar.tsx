import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
    return (
        <header className="px-5 py-3 bg-gray-900 shadow-md font-work-sans sticky top-0 z-50">
            <nav className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className='flex items-center gap-2'>
                    <Image
                        src="/logo.jpeg"
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    />
                    <p className='text-orange-400'>Blogger</p>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    <Link href="/home" className="text-white hover:text-orange-500 font-medium">
                        Home
                    </Link>
                    <Link href="/about" className="text-white hover:text-orange-500 font-medium">
                        About
                    </Link>
                    <Link href="/contact" className="text-white hover:text-orange-500 font-medium">
                        Contact
                    </Link>
                    <Link href="/user/sign-up" className="text-white hover:text-orange-500 font-medium">
                        Create Account
                    </Link>

                    {/* Login Button */}
                    <Link href="/user" className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all">Login</Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;