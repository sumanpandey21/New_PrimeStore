import React from 'react';
import Link from "next/link";
import Categories from './Categories';
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Image from 'next/image';
import { Menu } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose }) => {

    const { authToken } = useAuthStore();
    const pathname = usePathname();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <div className={`lg:hidden fixed inset-0 z-20 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
            {/* Background Overlay */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 left-0 bg-white z-50 flex flex-col w-64 sm:w-80 h-full shadow-lg transform transition-transform duration-300 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Header with Logo and Menu Icon */}
                <div className="flex items-center p-3.5 border-b border-gray-200">
                    <button
                        onClick={onClose} // This button now closes the menu
                        className="p-2 rounded-full hover:bg-gray-100 mt-1"
                    >
                        <Menu />
                    </button>
                    <Link
                        href="/"
                        className="flex items-center ml-[-10] "
                        onClick={onClose}
                    >
                        <Image
                            src="/primestore.svg"
                            alt="PrimeStore Logo"
                            width={48}
                            height={48}
                        />
                        <div className="hidden sm:block text-xl font-bold mt-1 ml-[-5]">PrimeStore</div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col p-4 border-b border-gray-200">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={index}
                                href={item.path}
                                onClick={onClose}
                                className={`w-full rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-100 ${isActive ? "text-orange-500 font-semibold" : "text-gray-700"}`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    {!authToken && (
                        <Link href="/login" onClick={onClose} className="w-full rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-100 text-gray-700">
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Categories */}
                <div className="flex-1 p-4">
                    <div className='font-semibold mb-2 text-gray-800'>Categories</div>
                    <Categories />
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;