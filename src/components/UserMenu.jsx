"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { LogOut } from 'lucide-react';
import { User } from 'lucide-react';

const UserMenu = () => {



    const router = useRouter();
    const { authToken, logout } = useAuthStore();



    const handleLogout = () => {
        logout();       // updates store + removes from localStorage
        router.push("/");
    };

    return (
        authToken && (
            <div className='md:flex flex-col bg-gray-800 opacity-80 backdrop-blur-2xl shadow-lg text-white text-sm w-fit py-1 lg:py-2 rounded-sm absolute top-15 lg:right-24 right-8 z-1' >
                <Link href="/myaccount/my-profile" className='flex justify-start items-center py-1 px-1 lg:px-4 lg:gap-2 gap-1 hover:bg-gray-900 opacity-100 rounded-sm'>
                    <User color="#ffffff" strokeWidth={1.75} />
                    <div>Manage MY Account</div>
                </Link>

                <Link href="/myaccount/order" className='flex justify-start items-center py-1 px-1 lg:px-4 lg:gap-2 gap-1 hover:bg-gray-900 opacity-100 rounded-sm'>
                    <Image src="/order.svg" alt="order logo" width={24} height={24} />
                    <div>MY Order</div>
                </Link>

                <Link href="/myaccount/cancellations" className='flex justify-start items-cente py-1 px-1 lg:px-4 lg:gap-2 gap-1 hover:bg-gray-900 opacity-100 rounded-sm'>
                    <Image src="/cancellation.svg" alt="cancellation logo" width={24} height={24} />
                    <div>MY Cancellations</div>
                </Link>

                <Link href="/myaccount/reviews" className='flex justify-start items-center py-1 px-1 lg:px-4 lg:gap-2 gap-1 hover:bg-gray-900 opacity-100 rounded-sm'>
                    <Image src="/review.svg" alt="review logo" width={24} height={24} />
                    <div>MY Reviews</div>
                </Link>

                <button
                    className='flex justify-start items-center  py-1 px-1 lg:px-4 lg:gap-2 gap-1 hover:cursor-pointer hover:bg-gray-900 opacity-100 rounded-sm'
                    onClick={handleLogout}
                >
                    <LogOut color="#ffffff" />
                    <div>Logout</div>
                </button>
            </div>
        )
    );
};

export default UserMenu;